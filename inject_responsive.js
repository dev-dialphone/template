const fs = require('fs');
const glob = require('fs').readdirSync('.').filter(f => f.endsWith('.html'));

const cssInjection = `
        /* --- BEGIN GLOBAL OVERRIDES --- */
        /* --- GLOBAL MOBILE OVERRIDES --- */
        @media (max-width: 640px) {
            body { 
                padding-left: 12px !important; 
                padding-right: 12px !important; 
                padding-top: 60px !important;
            }
            .container, .card, .email-container, .main-wrapper, .email-wrapper { 
                width: 100% !important; 
                max-width: 100% !important; 
                padding: 16px !important;
                box-sizing: border-box !important;
            }
            /* Force header elements into a single row */
            .header, .top-banner {
                display: flex !important;
                flex-direction: row !important;
                flex-wrap: nowrap !important;
                align-items: center !important;
                justify-content: space-between !important;
                padding: 16px 8px !important;
                gap: 8px !important;
                box-sizing: border-box !important;
                min-height: 40px !important;
                overflow: visible !important;
            }
            .header-left, .logo-section, .header-title-container, .brand-section, .logo-area {
                display: flex !important;
                flex-direction: row !important;
                flex-wrap: nowrap !important;
                align-items: center !important;
                gap: 8px !important;
                flex: 1 !important;
                min-width: 0 !important;
            }
            /* Prevent logo wrapper from shrinking to 0 width */
            div.logo, span.logo, .header-logo, .logo-icon {
                flex-shrink: 1 !important;
                width: auto !important;
                height: auto !important;
                margin: 0 !important;
                min-width: 0 !important;
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
            }
            /* Apply strict medium height ONLY to images */
            img.logo, .logo-img, .header-logo img, .logo-icon img, .brand-section img, div.logo img {
                height: 48px !important; 
                width: auto !important;
                flex-shrink: 0 !important;
                display: block !important;
                max-width: 100% !important;
            }
            .logo-text, .header-title, .logo-title, .brand-title, .heading h1, .header-text h1, .heading h2, .header-text h2, .heading h3, .header-text h3, .heading small {
                font-size: 16px !important; 
                line-height: 1.25 !important;
                margin: 0 !important;
                white-space: nowrap !important;
                text-overflow: ellipsis !important;
                overflow: hidden !important;
                text-align: left !important;
                min-width: 0 !important;
            }
            .logo-text-wrapper, .logo-text-block, .heading, .header-text, .header-center, .header-title-block {
                display: flex !important;
                flex-direction: row !important;
                align-items: center !important;
                justify-content: flex-start !important;
                gap: 4px !important;
                min-width: 0 !important;
                flex: 1 !important;
                border: none !important;
                padding-left: 0 !important;
            }
            .logo-subtitle, .logo-tagline, .banner-desc, .heading p, .header-text p, .header-subtitle {
                display: none !important;
            }
            /* The icon/illustration in the header */
            .header-right, .header-illustration, .header-right-td, .banner-illustration, .header-icon, .hero-illustration {
                display: flex !important;
                width: 115px !important; 
                max-width: 115px !important;
                flex: 0 0 115px !important;
                height: 100% !important;
                min-height: 40px !important;
                align-items: center !important;
                justify-content: center !important;
                padding-left: 0 !important;
                overflow: visible !important;
            }
            .header-right svg, .header-illustration svg, .banner-illustration svg, .header-icon svg, .hero-illustration svg {
                width: 100% !important;
                height: auto !important;
                max-width: 100% !important;
                max-height: 100% !important;
                object-fit: contain !important;
                overflow: visible !important;
            }
            svg.hero-svg {
                max-width: 180px !important;
                height: auto !important;
                margin: 0 auto !important;
                display: block !important;
            }
            /* Stack other body elements */
            .info-row, .features-row, .alert-actions { 
                display: flex !important;
                flex-direction: column !important; 
                align-items: flex-start !important;
                gap: 12px !important;
            }
            .btn, .btn-outline, .btn-primary, .support-btn, .dashboard-btn, .confirm-btn {
                width: 100% !important;
                justify-content: center !important;
                margin: 12px 0 0 0 !important;
                box-sizing: border-box !important;
            }
            .info-separator, .logo-divider, .header-divider, .brand-divider, .vertical-line-header, .header-left .vertical-line { display: none !important; }
            .info-item { margin-bottom: 8px !important; }
            
            /* Force OTP boxes into a single line */
            .otp-container {
                flex-wrap: nowrap !important;
                gap: 6px !important;
                width: 100% !important;
                justify-content: center !important;
                padding: 0 !important;
            }
            .otp-box {
                flex: 1 1 0 !important;
                width: auto !important;
                max-width: 50px !important;
                height: 55px !important;
                font-size: 24px !important;
            }
            
            /* Table-based email template overrides */
            td.header-cell {
                padding: 12px 8px !important;
                display: block !important;
            }
            td.header-cell > table, 
            td.header-cell > table > tbody,
            td.header-cell > table > tbody > tr {
                display: flex !important;
                width: 100% !important;
                flex-direction: row !important;
                align-items: center !important;
                justify-content: space-between !important;
            }
            td.header-cell > table > tbody > tr > td:first-child {
                display: flex !important;
                flex: 1 !important;
                min-width: 0 !important;
            }
            td.header-cell > table > tbody > tr > td:first-child > table,
            td.header-cell > table > tbody > tr > td:first-child > table > tbody,
            td.header-cell > table > tbody > tr > td:first-child > table > tbody > tr {
                display: flex !important;
                width: 100% !important;
                flex-direction: row !important;
                align-items: center !important;
            }
            td.header-cell > table > tbody > tr > td:first-child > table > tbody > tr > td:nth-child(1) {
                flex-shrink: 0 !important;
                display: block !important;
            }
            td.header-cell > table > tbody > tr > td:first-child > table > tbody > tr > td:nth-child(2) {
                display: none !important;
            }
            td.header-cell > table > tbody > tr > td:first-child > table > tbody > tr > td:nth-child(3) {
                flex: 1 !important;
                min-width: 0 !important;
                padding-left: 8px !important;
                border-left: 1px solid #eaeaea !important;
            }
            td.header-cell > table > tbody > tr > td:first-child > table > tbody > tr > td:nth-child(3) span {
                font-size: 16px !important;
                white-space: nowrap !important;
                text-overflow: ellipsis !important;
                overflow: hidden !important;
                display: block !important;
            }
            td.header-right-td {
                display: flex !important;
                width: 115px !important; 
                max-width: 115px !important;
                flex: 0 0 115px !important;
                align-items: center !important;
                justify-content: center !important;
            }
        }
        
        /* --- GLOBAL DESKTOP OVERRIDES --- */
        @media (min-width: 641px) {
            .logo, .header-logo {
                width: 54px !important;
                height: 54px !important;
                margin-right: 20px !important;
            }
            .header, .top-banner {
                padding: 30px 40px !important;
                flex-wrap: nowrap !important;
            }
            .vertical-line, .vertical-line-header, .logo-divider, .header-divider {
                margin-right: 20px !important;
            }
            .header-right {
                width: auto !important;
                max-width: 175px !important;
                flex-shrink: 0 !important;
            }
            .heading {
                display: flex !important;
                flex-direction: column !important;
                align-items: flex-start !important;
                gap: 6px !important;
                white-space: nowrap !important;
            }
            .heading h1, .heading h2, .heading h3, .heading small {
                display: inline-block !important;
                margin: 0 !important;
                white-space: nowrap !important;
            }
            .heading small, .heading h2:first-child:not(:last-child) {
                font-size: 13px !important;
                font-weight: 700 !important;
                color: #555 !important;
                letter-spacing: 0.5px !important;
            }
            .heading h1, .heading h2:only-child, .heading h3:only-child {
                font-size: 24px !important;
            }
            div.card {
                max-width: 1100px !important;
            }
        }
        /* --- END GLOBAL OVERRIDES --- */
`;

glob.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove previously injected block if it exists
    if (content.includes('/* --- BEGIN GLOBAL OVERRIDES --- */')) {
        content = content.replace(/\/\* --- BEGIN GLOBAL OVERRIDES --- \*\/(.|\n)*?\/\* --- END GLOBAL OVERRIDES --- \*\//g, '');
    } else if (content.includes('/* --- GLOBAL MOBILE OVERRIDES --- */')) {
        // Fallback for the old marker format
        content = content.replace(/\/\* --- GLOBAL MOBILE OVERRIDES --- \*\/(.|\n)*?\}\n\s*\}/g, '');
    }
    
    // Add the new block right before </style>
    if (content.includes('</style>')) {
        content = content.replace('</style>', cssInjection + '\n    </style>');
        fs.writeFileSync(file, content);
        console.log('Updated ' + file);
    }
});
