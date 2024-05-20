module.exports = {
    format_date: (date) => {
      if (!date) return ''; // Handle case where date is undefined
      return date.toLocaleDateString();
    },
  };
  