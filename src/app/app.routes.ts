import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

// Admin
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminProductsComponent } from './pages/admin/products/products.component';
import { ProductAddComponent } from './pages/admin/product-add/product-add.component';
import { ProductEditComponent } from './pages/admin/product-edit/product-edit.component';
import { AdminOrdersComponent } from './pages/admin/orders/orders.component';
import { AdminOrderDetailsComponent } from './pages/admin/orders/order-details.component';
import { AdminAnalyticsComponent } from './pages/admin/analytics/analytics.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'my-orders', component: MyOrdersComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Admin (specific routes before parameterized routes)
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/analytics', component: AdminAnalyticsComponent },
  { path: 'admin/products/add', component: ProductAddComponent },
  { path: 'admin/product-add', component: ProductAddComponent },
  { path: 'admin/product-edit/:id', component: ProductEditComponent },
  { path: 'admin/products/:id', component: ProductEditComponent },
  { path: 'admin/products', component: AdminProductsComponent },
  { path: 'admin/orders', component: AdminOrdersComponent }
  ,{ path: 'admin/orders/:id', component: AdminOrderDetailsComponent }
];
