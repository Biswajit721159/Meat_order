from .models import *
from rest_framework import serializers

class productSerializer(serializers.ModelSerializer):
    class Meta:
        model = product
        fields = '__all__'


class OrderProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=order_product
        fields =('product_id','order_id','mobile','price','name','number_product','date')

