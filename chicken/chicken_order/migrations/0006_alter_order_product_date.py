# Generated by Django 4.0.10 on 2023-10-10 07:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chicken_order', '0005_order_product_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order_product',
            name='date',
            field=models.CharField(default='', max_length=100),
        ),
    ]
