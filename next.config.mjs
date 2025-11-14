export default {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  transpilePackages: ['three'],
  webpack: (config) => {
    // Handle GLSL files
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader'],
    });
    
    // Ensure proper handling of ES modules
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    return config;
  },
};

