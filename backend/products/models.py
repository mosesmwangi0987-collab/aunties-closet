from django.db import models
from django.core.validators import MinValueValidator

# Define choices OUTSIDE the classes so they can be reused
SIZE_CHOICES = [
    ('XS', 'Extra Small'),
    ('S', 'Small'),
    ('M', 'Medium'),
    ('L', 'Large'),
    ('XL', 'Extra Large'),
    ('XXL', '2X Large'),
]

COLOR_CHOICES = [
    ('Black', 'Black'),
    ('White', 'White'),
    ('Red', 'Red'),
    ('Blue', 'Blue'),
    ('Green', 'Green'),
    ('Yellow', 'Yellow'),
    ('Purple', 'Purple'),
    ('Pink', 'Pink'),
    ('Brown', 'Brown'),
    ('Gray', 'Gray'),
]


# Model 1: Category
# This stores product categories like "Dresses", "T-Shirts", "Jeans"
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)  # URL-friendly version of name
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Categories"
    
    def __str__(self):
        return self.name


# Model 2: Product
# This stores the main product information
class Product(models.Model):
    # Basic information
    name = models.CharField(max_length=255)  # Product name
    description = models.TextField()  # Full description
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    
    # Pricing
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    cost_price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)], help_text="What you paid for this item")
    
    # Images
    image = models.ImageField(upload_to='products/')  # Main product image
    image_2 = models.ImageField(upload_to='products/', blank=True, null=True)  # Optional second image
    image_3 = models.ImageField(upload_to='products/', blank=True, null=True)  # Optional third image
    
    # Status
    is_active = models.BooleanField(default=True)  # Is this product available for sale?
    created_at = models.DateTimeField(auto_now_add=True)  # When was it added?
    updated_at = models.DateTimeField(auto_now=True)  # When was it last updated?
    
    class Meta:
        ordering = ['-created_at']  # Show newest products first
    
    def __str__(self):
        return self.name
    
    @property
    def profit_margin(self):
        """Calculate profit margin percentage"""
        if self.cost_price == 0:
            return 0
        return ((self.price - self.cost_price) / self.cost_price) * 100


# Model 3: ProductVariant
# This stores different sizes and colors of the same product
# Example: A blue shirt in size M is different from a black shirt in size L
class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    size = models.CharField(max_length=10, choices=SIZE_CHOICES)
    color = models.CharField(max_length=50, choices=COLOR_CHOICES)
    stock_quantity = models.PositiveIntegerField(default=0)  # How many in stock?
    sku = models.CharField(max_length=100, unique=True)  # Unique identifier
    
    class Meta:
        unique_together = ('product', 'size', 'color')  # Can't have duplicate variants
    
    def __str__(self):
        return f"{self.product.name} - {self.size} - {self.color}"
    
    def is_in_stock(self):
        return self.stock_quantity > 0