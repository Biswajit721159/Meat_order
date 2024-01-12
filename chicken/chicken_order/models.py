from django.db import models
from django.utils import timezone

class product(models.Model):
    id=models.AutoField(primary_key=True)
    product_url=models.CharField(max_length=20000000000000000000000000000000000)
    product_name=models.CharField(max_length=50)
    quantity=models.CharField(default="2kg",max_length=500)
    price=models.IntegerField(default=100)
    offer=models.IntegerField(default=5)
    product_type=models.CharField(max_length=100)
    rating=models.FloatField(default=5)
    numberOfPeopleGiven=models.IntegerField(default=1) 
    isdeleted=models.BooleanField(default=False)

class order_product(models.Model):
    order_id=models.AutoField(primary_key=True)
    mobile=models.CharField(max_length=12)
    product_id=models.CharField(max_length=100)
    name=models.CharField(max_length=100,default="Biswajit Ghosh")
    price=models.CharField(max_length=100,default=0)
    number_product=models.IntegerField(default=0)
    date = models.CharField(default="",max_length=100)
    