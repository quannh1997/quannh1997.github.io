import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { node } from 'prop-types';

import Favicon from '@assets/images/dinda-indra.png';
import '@assets/css/icomoon.css';
import '@assets/css/bootstrap.css';
import '@assets/css/style.css';

const IMAGE_URL = `https://thekusuma.com/static/slide-6-4715e29302dbaa2ba21494c6258298d4.jpg`;
const META_DESCRIPTION = `Với lòng cầu nguyện Ân Phước và Sự Chấp Thuận của Allah, cùng ý định thực hành Sunnah của Rasulullah ﷺ để xây dựng gia đình Sakinah, Mawaddah wa Rahmah, chúng tôi kính mong các bạn cầu nguyện cho chúng tôi luôn được thuận lợi và hạnh phúc. - Dinda & Indra`;

function MainLayout({ children }) {
  return (
    <Fragment>
      <Helmet>
        <title>Quân ❤️ Quyên Wedding</title>

        {/* Favicon */}
        <link rel="icon" type="image/png" href={Favicon} />

        {/* font and SEO tags */}
        <meta property="og:title" content="The Wedding of Dinda & Indra" />
        <meta property="og:image" content={IMAGE_URL} />
        <meta property="og:url" content="https://thekusuma.com" />
        <meta property="og:site_name" content="The Wedding of Dinda & Indra" />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta name="twitter:title" content="The Wedding of Dinda & Indra" />
        <meta name="twitter:description" content={META_DESCRIPTION} />
        <meta name="twitter:image" content={IMAGE_URL} />
        <meta name="twitter:url" content="https://thekusuma.com" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@idindrakusuma" />

        <link
          href="https://fonts.googleapis.com/css?family=Work+Sans:400,300,600,400italic,700"
          rel="stylesheet"
          type="text/css"
        />
        <link href="https://fonts.googleapis.com/css2?family=Cookie&display=swap" rel="stylesheet"></link>
        
        {/* Cloudinary Upload Widget */}
        <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>
      </Helmet>
      <div id="page">{children}</div>
    </Fragment>
  );
}

MainLayout.propTypes = {
  children: node.isRequired,
};

export default MainLayout;
