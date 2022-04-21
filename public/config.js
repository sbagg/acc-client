let themeConfig = {
  universityLogo : '/images/logo-ucd.svg',
  libraryLogo : '/images/logo-lib-white.png',
  loadingIcon : '/images/logo-lib-icon.svg',
  universityUrl : 'https://ucdavis.edu',
  universityName : "UC Davis",
  libraryUrl : "https://library.ucdavis.edu",
  siteTitle : "Aggie Crop Calculator",
  siteSubTitle : "Prototype",
  libraryAddress : ['UC Davis Library',
                    "100 NW Quad",
                    "University of California, Davis",
                    'Davis, CA 95616',
                    '(530) 752-8792'],
  libraryEmail : "experts@library.ucdavis.edu",
  footerColumn1 : {'title' : 'Need Help?',
                   'content' : ['<a href="/help">Frequently Asked Questions</a>',
                   '<a href="mailto:experts@library.ucdavis.edu">Contact Us</a>',
                   '<a href="https://github.com/ucd-library/aggie-experts-public-issues/issues/new/choose" target="_blank" rel="noopener">Report Issue</a>']},
  footerColumn2 : {'title': 'Terms of Use',
                   'content': [
                     '<a href="/termsofuse">Terms of Use</a>',
                     '&#169;2020 The Regents of the University of California, Davis'
                    ],
                  },
  // footerColumn3 : {'title': 'Header', 'content': ['Content']},
  footerLines : ['<a href="https://ucdavis.edu">University of California, Davis</a>, One Shields Avenue, Davis, CA 95616<span class="mx-2">|</span>530-752-1011',
                 `<a href="https://diversity.ucdavis.edu/principles-community" target="_blank" rel="noopener">Principles of Community</a>
                  <span class="mx-2">|</span>
                  <a href="https://www.universityofcalifornia.edu/" target="_blank" rel="noopener">University of California</a>`,
                 'Copyright &#169; 2020 The Regents of the University of California, Davis campus. All rights reserved.']
};
let config = {theme : themeConfig}

export default config;