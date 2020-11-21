import React from "react";
import { PageProps } from "gatsby";

import Layout from "../components/layout";
import TextPage from "../components/text-page";

const Office: React.FC<PageProps> = (props) => {
  return (
    <Layout>
      <TextPage>
        <h2>Design Research Office</h2>
        <p>
          The practice was established in 2006 to provide services and solutions
          in architecture, design, urbanism and landscape. It operates within
          the traditional boundaries of architecture and urbanism. Each
          project draws equally from research and design, initiating conceptual
          studies to complex technical implementations. The Design Research
          Office is dedicated to realizing architecture, and focuses its ongoing
          research around creating a singular architectural language that
          springs from multiple collaborative processes.
        </p>

        <h2>Architecture</h2>
        <p>
          The practice integrates architecture, urban design and landscape
          architecture. The uniqueness of each architectural project lies in the
          strategy and design led developments and implementations. The result
          is a creation that is simultaneously delicate and powerful, precise
          and fluid, and ingenious that is not overly or overtly clever. These
          buildings interact successfully within their contexts and the
          activities they contain, while creating a sense of fullness and
          experiential richness.
        </p>
        <h2>Services</h2>
        <p>
          The services are extensive, and range from designs of products and
          communication devices on one end, to design of individual buildings or
          adjustments to existing buildings, urban and landscape design, and
          brief development and strategic planning on the other end.{" "}
        </p>
        <h2>Contact</h2>
        <p>
          <a href="mailto:d-r-o@d-r-o.net">d-r-o@d-r-o.net</a>
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <p>
          © DRO {new Date().getFullYear()}
          <br />
          All rights reserved
          <br />
          No material contained within this website may be reproduced,
          distributed, modified, transmitted, reused or adapted without the
          prior written permission of Valis Loizides – Design Research Office.
        </p>
        <p>
          designresearchoffice.co.uk includes links to external websites.
          <br />
          Valis Loizides is not responsible for the content of these internet
          sites.
        </p>
        <br />
        <p>instagram.com/valisloizides</p>
      </TextPage>
    </Layout>
  );
};

export default Office;
