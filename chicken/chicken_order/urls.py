
from django.contrib import admin
from django.urls import path,include
from chicken_order import views

urlpatterns = [
    path('',views.productapi),
    path('type',views.foundType),
    path('order',views.Order_Product),
]
