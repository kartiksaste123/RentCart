/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'res.cloudinary.com', 
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'images-cdn.ubuy.co.in',
      'encrypted-tbn0.gstatic.com',
      'cdn3.evostore.io',
      // Add more domains as needed for product images
      'cdn.pixabay.com',
      'images.unsplash.com',
      'media.istockphoto.com',
      'm.media-amazon.com',
      'static.toiimg.com',
      'img.freepik.com',
      'upload.wikimedia.org',
      'plus.unsplash.com',
      'images.pexels.com',
      'i.imgur.com',
      'img.icons8.com'
    ]
  }
}

module.exports = nextConfig

// NOTE: Restart the Next.js server after modifying this file for changes to take effect.
