export function injectJsonLd(data){
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export function baseJsonLd({ name, description, url }){
  return {
    "@context":"https://schema.org",
    "@type":"WebSite",
    "name": name,
    "description": description,
    "url": url
  };
}
