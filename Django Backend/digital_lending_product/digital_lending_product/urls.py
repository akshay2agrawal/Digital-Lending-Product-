from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from loan_calculator import views

# Create a router and register the view sets
router = routers.DefaultRouter()

router.register(r'customers', views.CustomerViewSet, basename='customer')
router.register(r'loanoffers', views.LoanOfferViewSet, basename='loanoffer')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
