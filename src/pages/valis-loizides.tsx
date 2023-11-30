import React from "react";
import { PageProps, useStaticQuery, graphql, HeadProps } from "gatsby";

import Layout from "../components/layout";
import TextPage from "../components/text-page";
import SafeImage, { ImageNode } from "../components/safe-image";
import Seo from "../components/seo";

export const Head = (props: HeadProps) => {
  console.log(props);

  return (
    <Seo
      pathname={props.location.pathname}
      title="Valis Loizides"
      description={`Valis Loizides was born in Cyprus. He graduated from the Architectural
    Association School of Architecture in London with Honours in 1997. He
    continued at the AA for Postgraduate studies until 1999, on a full
    scholarship offered by the Architectural Association, and received a
    Master of Arts. He established the Design Research Office (DRO) in
    2006, and practices architecture internationally in the private
    sector, with offices in the UK and Cyprus.`.split("\n")
        .map((a) => a.trim())
        .join(" ")}
    // image={data.file?.childImageSharp?.fixed?.src}
    />
  )
};

const ValisLoizides: React.FC<PageProps> = (props) => {
  const data: {
    file: ImageNode;
  } = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/valis.jpg" }) {
        id
        name
        childImageSharp {
          gatsbyImageData(
            quality: 70
            layout: FULL_WIDTH
            formats: [AUTO, WEBP]
          )
          fixedImage: gatsbyImageData(
            width: 960
            quality: 70
            layout: FIXED
            formats: [AUTO, WEBP]
          )
        }
      }
    }  
  `);

  return (
    <Layout {...props}>
      <TextPage>
        <SafeImage node={data.file} alt="Valis Loizides" />
        <p>
          Valis Loizides was born in Cyprus. He graduated from the Architectural
          Association School of Architecture in London with Honours in 1997. He
          continued at the AA for Postgraduate studies until 1999, on a full
          scholarship offered by the Architectural Association, and received a
          Master of Arts. He established the Design Research Office (DRO) in
          2006, and practices architecture internationally in the private
          sector, with offices in the UK and Cyprus.
        </p>
        <p>
          For Valis Loizides, architecture is a process in which ideas are
          developed through a synthesis of research and physical application.
          With interests that range from technical sciences to the arts, he is
          both a pragmatist and a visionary, using practical means to aspire to
          beauty and wonder. His curiosity drives him continually to explore new
          techniques, materials and processes, and to glean knowledge from other
          professionals. The work by the architects and radical thinkers Ryue
          Nishizawa, Kazuyo Sejima, Rem Koolhaas, Peter Zumthor and Aires Mateus
          was important in the formation of Valis’ ideas.
        </p>
        <p>
          Valis has a deep interest in contemporary art. Artists such as Cy
          Twombly, Raoul de Keyser, Franz West, Luc Tuymans, Marlene Dumas,
          Wolfgang Tillmans, Nicos Alexiou and William Forsyth have inspired his
          work. Since 2000, he has been following art in London, New York,
          Berlin and Milan. He soon discovered he had a strong affinity with
          abstract art, and this passion inspired him to create his own private
          collection of contemporary, international art, with an emphasis on
          paintings and drawings.
        </p>
        <p>
          Architecture makes an indelible impact on a place and it is a complex
          and dignified artform. Valis’ drive is for the creation of space for
          daily life in relation to the human requirements for shelter, comfort
          and functionally usable spaces with a sense of complex beauty. He has
          been following the fashion (or anti-fashion) from the unconventional
          ethos in the raw creativity of Rei Kawakubo, Issey Miyake and Yohji
          Yamamoto that influenced his design evolution. Their avant garde
          tailoring and clothing designs, produces garments that are oversized,
          and asymmetrical, and twisted and bulged or otherwise don't conform to
          the lines of the human body.
        </p>
        <p>
          The abstract, minimalist and unfamiliar graphics by designers William
          Hall and John Morgan were reference to the development of the
          aesthetics and the visual identity for Valis’ office and work.
        </p>
        <p>
          Valis loves gastronomy. He bakes, cooks and shares tastes and life in
          the kitchen with his family, friends and collaborators. His culinary
          ‘travels’ are in the Mediterranean classic cuisine from Greece, Italy
          (cucina povera), south of France and the Middle East. He drives his
          creative curiosity by playing with texture, taste, perfume, colour,
          light and transparency. Alice Walters, Margot Henderson and Marcela
          Hazan are cooks that influenced his farm to table seasonal cooking.
          Valis recently started in Cyprus his 100% all-natural and produced
          bio-dynamically vegetable growing, in a field inherited from his
          grandfather.
        </p>
      </TextPage>
    </Layout>
  );
};

export default ValisLoizides;
