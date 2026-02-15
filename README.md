# Furnix - Modern Furniture E-Commerce App

A full-featured React Native furniture shopping application built with Expo, featuring user authentication, product management, shopping cart, favourites, order management, and payment card storage.

## Features

### Authentication
- **Email Sign Up/Sign In** - Register and login with email and password
- **Password Reset** - Forgot password functionality with email verification
- **Role-Based Access** - Admin users (admin@gmail.com) get access to admin panel, regular users see the shopping experience

### User Panel
- **Product Browsing** - View all furniture products in a beautiful grid layout
- **Search** - Real-time product search with validation (minimum 2 characters)
- **Product Details** - View full product information with images
- **Buy Now** - Direct purchase flow from product details

### Shopping Cart
- **Add/Remove Items** - Easy cart management
- **Quantity Control** - Adjust item quantities
- **Cart Badge** - Visual indicator showing cart item count
- **Checkout Flow** - Complete purchase with delivery details

### Favourites
- **Add to Favourites** - Heart icon on product cards
- **My Favourites Screen** - View all favourited items
- **Database Sync** - Favourites persist across sessions

### Orders
- **Order Placement** - Place orders with delivery and payment details
- **Order History** - View all past orders with status tracking
- **Order Details** - Date, amount, items count, payment method, delivery address

### Payment Cards
- **Save Cards** - Store payment cards securely
- **Card Preview** - Live card preview while entering details
- **Manage Cards** - View and delete saved cards

### Admin Panel
- **Product Management** - Add, edit, delete products
- **Product Details** - Full CRUD operations on furniture items
- **Image Support** - Product images via URL

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Context API (CartContext, FavouritesContext)
- **Backend**: Firebase
  - Authentication (Email/Password)
  - Firestore Database
- **UI**: Custom components with Linear Gradient styling
- **Icons**: @expo/vector-icons (Ionicons, AntDesign)
- **Images**: expo-image

## Project Structure

```
furnix-app/
├── app/
│   ├── _layout.tsx          # Root layout with providers
│   ├── index.tsx             # Entry point
│   └── screens/
│       ├── MainScreen.tsx    # Landing page
│       ├── SignIn.tsx        # Login screen
│       ├── SignUp.tsx        # Registration screen
│       ├── ForgotPassword.tsx
│       ├── CreateNewPassword.tsx
│       ├── UserProduct.tsx   # User product browsing
│       ├── GetProductBuId.tsx # Product detail
│       ├── OrderPlace.tsx    # Single product checkout
│       ├── Cart.tsx          # Shopping cart
│       ├── Checkout.tsx      # Cart checkout
│       ├── Favourites.tsx    # User favourites
│       ├── MyOrders.tsx      # Order history
│       ├── AddNewCard.tsx    # Payment cards
│       ├── AdminProducts.tsx # Admin product list
│       ├── AdminProductDetail.tsx
│       ├── AddProduct.tsx
│       └── UpdateProduct.tsx
├── components/ui/
│   ├── ProfileDropdown.tsx   # User menu dropdown
│   ├── ProductCard.tsx       # Product display card
│   ├── CartItem.tsx          # Cart item component
│   └── ...other UI components
├── context/
│   ├── CartContext.tsx       # Cart state management
│   └── FavouritesContext.tsx # Favourites state management
├── service/
│   ├── AuthService.ts        # Authentication functions
│   ├── ChairService.ts       # Product CRUD operations
│   ├── OrderService.ts       # Order management
│   ├── CardService.ts        # Payment card storage
│   └── FavouriteService.ts   # Favourites database operations
├── config/
│   └── config.ts             # Firebase configuration
├── constants/
│   └── theme.ts              # Colors and theme
└── interfaces/
    └── Chair.ts              # TypeScript interfaces
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo CLI
- Firebase project

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd furnix-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure Firebase
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Email/Password authentication
   - Create a Firestore database
   - Update `config/config.ts` with your Firebase credentials:
   ```typescript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };
   ```

4. Start the app
   ```bash
   npx expo start
   ```

5. Run on device/emulator
   - Scan QR code with Expo Go app (iOS/Android)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator

## Firebase Collections

### users
```
{
  email: string,
  displayName: string,
  createdAt: timestamp
}
```

### chairs (products)
```
{
  title: string,
  description: string,
  price: number,
  image: string (URL)
}
```

### orders
```
{
  email: string,
  amount: number,
  date: timestamp,
  billingAddress: {
    fullName: string,
    phone: string,
    address: string,
    city: string,
    zipCode: string
  },
  paymentMethod: string,
  itemCount: number,
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
}
```

### cards
```
{
  email: string,
  cardNumber: string (masked),
  cardHolder: string,
  expiryDate: string,
  lastFourDigits: string
}
```

### favourites
```
{
  email: string,
  productId: string,
  title: string,
  description: string,
  price: number,
  image: string
}
```

## User Flows

### New User Registration
1. Open app → MainScreen
2. Tap "Continue with Email" → SignUp
3. Enter name, email, password → Create account
4. Redirected to UserProduct (shopping)

### Shopping Flow
1. Browse products on UserProduct screen
2. Search for products using search bar
3. Tap product → View details on GetProductBuId
4. Tap "Buy Now" → OrderPlace with product details
5. OR add to cart → Cart → Checkout

### Admin Flow
1. Sign in with admin@gmail.com
2. Redirected to AdminProducts
3. View/Add/Edit/Delete products

## Customization

### Theme Colors
Edit `constants/theme.ts`:
```typescript
export const Colors = {
  primary: '#8B5CF6',
  gradientPurpleCoral: ['#8B5CF6', '#EC4899'],
  error: '#EF4444',
  // ...
}
```

### Fonts
The app uses 'Robotslab' font. Configure in `config/Fonts.ts`.

## License

This project is for educational purposes.

## Support

For questions or issues, please open an issue in the repository.
