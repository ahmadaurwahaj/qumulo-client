export default {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/metrics",
        permanent: true,
      },
    ];
  },
};
