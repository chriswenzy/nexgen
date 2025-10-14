export const getStatusVariant = (status) => {
  switch (status) {
    case "Delivered":
    case "Active":
    case "In Stock":
      return "success";
    case "Shipped":
    case "Processing":
      return "info";
    case "Low Stock":
      return "warning";
    case "Out of Stock":
    case "Inactive":
    case "Cancelled":
      return "danger";
    default:
      return "secondary";
  }
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getBlogStatusVariant = (status) => {
  switch (status) {
    case "Published":
      return "success";
    case "Draft":
      return "secondary";
    case "Scheduled":
      return "warning";
    case "Archived":
      return "danger";
    default:
      return "secondary";
  }
};

export const formatReadTime = (minutes) => {
  return `${minutes} min read`;
};

export const formatViews = (views) => {
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}k`;
  }
  return views.toString();
};
