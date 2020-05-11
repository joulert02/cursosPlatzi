import React from "react"
import BannerAdvice from "../components/molecules/bannerAdvice/banner-advice"
import ModalAlert from "../components/molecules/modalAlert/modalAlert"
import ModalCoverage from "../components/molecules/modalCoverage/modalCoverage"
import ModalAuth from "../shared/components/molecules/modalAuth/modal-auth"
import ModalFreeSample from "../components/molecules/modalFreeSample/modal-free-sample"
import ProductsSections from "../components/molecules/productsSections/productsSections"
import ShoppingCar from "../components/molecules/shoppingCar/shopping-car"
import TabProducts from "../shared/components/molecules/tabProducts/tabProducts"
import Layout from "../shared/components/organisms/layout/layout"
import useCrudFreeSample from "../shared/hooks/useCrudFreeSample"
import useMobileMode from "../shared/hooks/useMobileMode"
import useModalAuth from "../shared/hooks/useModalAuth"
import useModalFreeSample from "../shared/hooks/useModalFreeSample"
import useModalGeneric from "../shared/hooks/useModalGeneric"
import { graphql } from "gatsby"
import SearchAdviser from "../shared/components/atoms/search-adviser/search-adviser"
import useLocaleMode from "../shared/hooks/useLocaleMode";
import useCoverageState from "../shared/hooks/useCoverageState"
import { navigate } from "gatsby";

const HomeSectionFreeSample = props => {

  const { isMobile, currentPage } = useMobileMode()
  const [isModalFreeSample,product,selectProduct,unSelectProduct,] = useModalFreeSample()
  const [isModalAuth, validateSamples, hideModalAuth] = useModalAuth()
  const [showingModalAlert, showModalAlert, hideModalAlert] = useModalGeneric(false)
  const [samples, addSample, removeSample, response] = useCrudFreeSample()
  const context = props.data.allContentfulTenaMuestraGratis.nodes.filter(node => node.slug === props.pageContext.slug)[0]
  let samplesSent = response ? response.status === 200 && response.data : []
  
  const {locale} = useLocaleMode();
  const [showingModalCoverage,showModalCoverage,hideModalCoverage] = useModalGeneric(false)
  const citys = props.data.allContentfulTenaPaises.nodes.filter(node => locale.includes(node.codigoDeDosLetras));
  const [isCityCoverage] = useCoverageState(citys[0].childrenContentfulTenaPaisesCiudadesJsonNode)
  
  React.useEffect(() => {
      !isCityCoverage && showModalCoverage()
  },[isCityCoverage])

  return (
    <Layout isMobile={isMobile} currentPage={currentPage}>
      <article style={{ paddingBottom: "0", overflow: "hidden" }}>
        <div>
          <SearchAdviser />
        </div>
        {showingModalCoverage  && <ModalCoverage hideAction={hideModalCoverage} actionAlert={()=>navigate('mi-cuenta/datos-personales')} />}
        {context && (
          <>
            <BannerAdvice json={context.banner && context.banner.json} />
            <TabProducts slug={context.slug} tabs={context.menu} />
            <ProductsSections
              isFreeSamples={true}
              actionSection={
                samples.length < 5 ? selectProduct : showModalAlert
              }
              modeAction={[context.lblAgregar, context.lblAgregado]}
              title={"*"}
              isCurved={true}
              noCenter={true}
              slug={context.slug}
              isMobile={isMobile}
              productos={context.productos}
              samples={samples}
              samplesSent={samplesSent}
            />
            {!showingModalCoverage && samples && samples.length > 0 && (
              <ShoppingCar
                removeSample={removeSample}
                samples={samples}
                jsonProductSelec={context.productosSeleccionados.json}
                actionCar={validateSamples}
                labelButton={context.lblSolicitarMuestra}
              />
            )}
            {isModalFreeSample && (
              <ModalFreeSample
                isFreeSamples={true}
                slug={context.slug}
                product={product}
                labelButtonMuestra={context.lblAgregar}
                labelMuestra={context.laMuestraEsPara}
                recipients={context.destinariosDeLaMuestra}
                hideAction={unSelectProduct}
                addSample={addSample}
                lbtalla={context.tallaNecesitada}
                samples={samples}
                samplesSent={samplesSent}
              />
            )}
            {isModalAuth && <ModalAuth hideAction={hideModalAuth} showingModalCoverage={showingModalCoverage} showModalCoverage={showModalCoverage}/>}
            {showingModalAlert && (
              <ModalAlert
                hideAction={hideModalAlert}
                actionAlert={validateSamples}
              />
            )}
          </>
        )}
      </article>
    </Layout>
  )
}

export default HomeSectionFreeSample

export const query = graphql`
  query GET_CONTENT_FREE_SAMPLES($language: String!) {
    allContentfulTenaMuestraGratis(filter: { node_locale: { eq: $language } }) {
      nodes {
        titulo
        slug
        lblAgregar
        destinariosDeLaMuestra
        laMuestraEsPara
        lblSolicitarMuestra
        lblAgregado
        tallaNecesitada
        productosSeleccionados {
          json
        }
        banner {
          json
        }
        menu {
          opcionesMenu {
            nombre
            slug
            categoria {
              slug
            }
          }
        }
        productos {
          id
          codigoDeProducto
          talla
          numeroDeGotas
          numeroDeGotasLlenas
          nombreProducto
          ctaComprarEnLinea
          ctaMuestraGratis
          ctaPuntosDeVenta
          redireccionComprarEnLinea
          redireccionMuestraGratis
          redireccionPuntosDeVenta
          ctaSaberMas
          descripcionProducto {
            json
          }
          nivelIncontinencia {
            json
          }
          imagenProductoPrevisualizacion {
            file {
              url
            }
            description
          }
          imagenProductoCompleta {
            description
            file {
              url
            }
          }
          descripcionImagenProductoPrevisualizacion
          slug
          selloUno {
            title
            file {
              url
            }
          }
          descripcionSelloUno {
            json
          }
          selloDos {
            title
            file {
              url
            }
          }
          descripcionSelloDos {
            json
          }
          selloTres {
            title
            file {
              url
            }
          }
          descripcionSelloTres {
            json
          }
          selloCuatro {
            title
            file {
              url
            }
          }
          descripcionSelloCuatro {
            json
          }
          beneficios {
            json
          }
          imagenMuestraCompleta {
            fluid(maxWidth: 1000, quality: 100) {
              src
              srcSet
              base64
              aspectRatio
              sizes
            }
          }
          imagenMuestraPrevisualizacion {
            fluid(maxWidth: 600, quality: 80) {
              src
              srcSet
              base64
              aspectRatio
              sizes
            }
          }
        }
      }
    }
    allContentfulTenaPaises(filter: {node_locale: {eq: "es-CO"}}) {
      nodes {
        codigoDeDosLetras
        titulo
        node_locale
        codigoDelPais
        childrenContentfulTenaPaisesCiudadesJsonNode {
          codigo
          id
          nombre
          codigoDepartamento
        }
      }
    }
  }
`