const cleanUrl = (url) => {
    // Check if it's already properly formed
    return url ? url.trim().replace(/<.*?>/g, '') : '';
  };

export default cleanUrl;