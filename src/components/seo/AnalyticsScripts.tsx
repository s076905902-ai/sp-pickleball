"use client";

import Script from "next/script";

/**
 * Analytics Scripts — GA4, GTM, Microsoft Clarity
 * All IDs are pulled from env vars. If the var is empty, the script is not injected.
 */
export default function AnalyticsScripts() {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  return (
    <>
      {/* Google Tag Manager */}
      {gtmId && (
        <>
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
          {/* GTM noscript — should be placed at the top of <body>, but here for simplicity */}
        </>
      )}

      {/* Google Analytics 4 (standalone if no GTM) */}
      {ga4Id && !gtmId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}');`}
          </Script>
        </>
      )}

      {/* Microsoft Clarity */}
      {clarityId && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");`}
        </Script>
      )}
    </>
  );
}
