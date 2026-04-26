# Mapbox GL Setup Instructions

## Get Your Free Mapbox Token

1. **Sign up for Mapbox** (free tier):
   - Go to https://account.mapbox.com/auth/signup
   - Create a free account
   - Verify your email

2. **Get Your Access Token**:
   - Go to https://account.mapbox.com/tokens/
   - Find your "Default public token" or create a new one
   - Copy the token

3. **Add to Your Environment**:
   - Create a `.env.local` file in the root directory
   - Add this line:
     ```
     NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
     ```

4. **Restart Your Dev Server**:
   ```bash
   npm run dev
   ```

## Features

✅ Real Mapbox maps with satellite/street views  
✅ Shipment markers with popups  
✅ Route visualization (origin → current → destination)  
✅ Zoom in/out controls  
✅ Click markers to see shipment details  
✅ Live tracking display  

## Free Tier Limits

- 50,000 map views per month (free)
- Unlimited API requests
- Perfect for demos and development

## Troubleshooting

If you see a red warning on the map:
- Check that `.env.local` file exists in the root directory
- Verify the token is copied correctly
- Restart the dev server
- Clear browser cache if needed
