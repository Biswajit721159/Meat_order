# Generated by Django 4.0.10 on 2023-10-08 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='product',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('product_url', models.CharField(max_length=20000000000000000000000000000000000)),
                ('product_name', models.CharField(max_length=50)),
                ('quantity', models.CharField(default='1kg', max_length=50)),
                ('price', models.IntegerField(default=100)),
                ('offer', models.IntegerField(default=5)),
                ('product_type', models.CharField(max_length=100)),
                ('rating', models.FloatField(default=5)),
                ('numberOfPeopleGiven', models.IntegerField(default=1)),
                ('isdeleted', models.BooleanField(default=False)),
            ],
        ),
    ]
