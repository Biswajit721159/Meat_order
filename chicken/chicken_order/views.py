from django.shortcuts import render,HttpResponse
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

from rest_framework import viewsets
from .serializers import *
from .models import *


@csrf_exempt
def productapi(request,pk=0):

    if request.method=="PATCH":
        product_data = JSONParser().parse(request)
        id=product_data['id']
        data=product.objects.all()
        ans=[]
        for i in data:
            if str(i.id)==str(id):
                ans.append(i)
                break
        product_serializer = productSerializer(ans, many=True)
        return JsonResponse(product_serializer.data,  safe=False)
    
    elif request.method=="GET":
        all_product=product.objects.all()
        product_serializer = productSerializer(all_product, many=True)
        return JsonResponse(product_serializer.data,  safe=False)
    
    elif request.method == 'PUT':
        product_data = JSONParser().parse(request)
        data = product.objects.all()
        product_arrays=[]
        for i in data:
            if str(i.id)==str(product_data['id']):
                product_arrays=i
                break                  
        product_s = productSerializer(product_arrays, data=product_data)
        if product_s.is_valid():
            product_s.save() 
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed To Update",  safe=False)	
    
    elif request.method=="POST":
        get_data=JSONParser().parse(request)
        iswistlist_serializerr = productSerializer(data=get_data)
        if iswistlist_serializerr.is_valid():
            iswistlist_serializerr.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed To Add", safe=False)
    
    elif request.method=="DELETE":
        get_data=JSONParser().parse(request)
        data=product.objects.all()
        arr=[]
        count=0
        for i in data:
            if str(i.id)==str(get_data['id']):
                arr=i
                count+=1
                break
        if count:        
            arr.delete()
            return JsonResponse("SuccessFully Deleted",safe=False)
        else:
            return JsonResponse("We Find Some Error",safe=False)


@csrf_exempt
def foundType(request):
    if request.method=="PATCH":
        get_data=JSONParser().parse(request)
        type=get_data['type']
        page=get_data['page']

        low=page*12
        high=(page+1)*12

        data=product.objects.all()
        ans=[]
        if len(type)!=0:
            for i in data:
                if (i.product_type)==(type):
                    ans.append(i)
        else : ans=data

        obj={}  
        if page==0:obj['prev']=False
        else : obj['prev']=True


        if len(ans)>high: obj['next']=True
        else : obj['next']=False

        ans=ans[low:high]
        product_serializer = productSerializer(ans, many=True)
        data=product_serializer.data

        res={}
        res['data']=data

        pagination={}
        pagination['pagination']=obj

        ans=[]
        ans.append(res)
        ans.append(pagination)
        return JsonResponse(ans,  safe=False)



@csrf_exempt
def Order_Product(request,pk=0):
    if request.method=="POST":
        order_data = JSONParser().parse(request)
        print(order_data)
        order_serializerr = OrderProductSerializer(data=order_data)
        print(order_serializerr.error_messages)
        if order_serializerr.is_valid():
            order_serializerr.save()
            return JsonResponse("Successfully order", safe=False)
        return JsonResponse("Failed To Add", safe=False)
    elif request.method=="GET":
        data=product.objects.all()
        order_serializer = OrderProductSerializer(data, many=True)
        return JsonResponse(order_serializer.data,  safe=False)