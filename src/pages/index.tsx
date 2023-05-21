import * as React from "react"
import { graphql } from "gatsby"
import "@ui5/webcomponents-icons/dist/past.js";
import "@ui5/webcomponents-icons/dist/present";
import "@ui5/webcomponents-icons/dist/database";
import "@ui5/webcomponents-icons/dist/source-code";
import "@ui5/webcomponents-icons/dist/cloud";
import "@ui5/webcomponents-icons/dist/overview-chart";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import { Avatar, Badge, DynamicSideContent, FlexBox, FlexBoxDirection, Icon, Input, InputDomRef, MessageStrip, ShellBar, SideContentPosition, ThemeProvider, Timeline, TimelineItem, TimelineLayout, Title, TitleLevel, Token, Ui5CustomEvent, MessageStripDesign, Text } from '@ui5/webcomponents-react';
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { BlogItems } from "../components/BlogItems";
setTheme("sap_horizon");

const BlogIndex = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const [articles, setArticles] = React.useState([]);
  const [search, setSearch] = React.useState('');

  console.log(data.allMarkdownRemark.nodes);
  React.useEffect(() => {
    setArticles(data.allMarkdownRemark.nodes)
  }, []);

  React.useEffect(() => {
    setArticles(data.allMarkdownRemark.nodes.filter((e) => e.frontmatter.title.includes(search)));
    const upper = search.toUpperCase()
    setArticles(data.allMarkdownRemark.nodes.filter((e) => e.frontmatter.tags.includes(upper)))
  }, [search]);

  const onCloseMessage = () => {
    setSearch('')
  }

  const onChangeSearch = (event: Ui5CustomEvent<InputDomRef, never>): void => {
    setSearch(event.target.typedInValue)
  }
  return (
    <ThemeProvider>
      <ShellBar
        logo={<img alt="SAP Logo" src="https://sap.github.io/ui5-webcomponents/assets/images/sap-logo-svg.svg" />}
        primaryTitle={siteTitle}
        searchField={<Input value={search} onChange={onChangeSearch} />}
        
        showSearchField
        profile={<Avatar><img src="/me.JPEG" /></Avatar>}>
      </ShellBar>
      <DynamicSideContent
        style={{ height: '100%', width: '90%' }}
        sideContentPosition={SideContentPosition.Start}
        sideContent={<FlexBox direction={FlexBoxDirection.Column}>
          <FlexBox>
            <Avatar style={{ height: '60%', width: '60%' }}>
              <img src="/me.JPEG" />
            </Avatar>
            <Timeline><TimelineItem name="Hay que ser muy friki para escribir un blog, pero más friki hay que ser para seguirlo 😜"></TimelineItem></Timeline>
          </FlexBox>
          <FlexBox direction={FlexBoxDirection.Row}>
            <div>
              <Badge colorScheme="10" icon={<Icon name="source-code" />}>CAPM</Badge>
              <Badge colorScheme="10" icon={<Icon name="database" />}>SAP HANA Cloud</Badge>
              <Badge colorScheme="10" icon={<Icon name="overview-chart" />}>SAP Cloud Architecture</Badge>
              <Badge colorScheme="10" icon={<Icon name="cloud" />}>SAP Business Technology Platform</Badge>
              <Badge colorScheme="10" icon={<Icon name="source-code" />}>React</Badge>
            </div>
          </FlexBox>
          <Title level={TitleLevel.H4}>Información Profesional</Title>
          <Timeline layout={TimelineLayout.Vertical}>
            <TimelineItem
              icon="present"
              name="adidas"
              subtitleText="2022/04">
              <div>
                SAP Cloud Engineer
              </div>
            </TimelineItem>
            <TimelineItem
              icon="past"
              name="NTT DATA"
              subtitleText="2021/04">
              <div>
                SAP Cloud Engineer
              </div>
            </TimelineItem>
            <TimelineItem
              icon="past"
              name="Accenture"
              subtitleText="2020/04">
              <div>
                SAP Cloud Engineer
              </div>
            </TimelineItem>
            <TimelineItem
              icon="past"
              name="Everis"
              subtitleText="2014/03">
              SAP Full Stack Analyst
            </TimelineItem>
          </Timeline>
        </FlexBox>}>
        {
          articles.length > 0 ?
            <BlogItems data={articles} />
            :
            <MessageStrip onClose={onCloseMessage} design={MessageStripDesign.Information}><Text>No se ha encontrado ninguna entrada para esa búsqueda</Text></MessageStrip>
        }
      </DynamicSideContent>
    </ThemeProvider>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit:1000, sort:{order:DESC, fields:[frontmatter___date]}) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        },
        html
      }
    }
  }
`
