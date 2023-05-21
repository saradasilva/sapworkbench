import * as React from "react"
import { graphql, useStaticQuery } from 'gatsby';
import { Bar, Button, CustomListItem, Icon, Label, List, NotificationListItem, BarDesign, MessageBox, Text, MessageStrip, MessageStripDesign, Ui5CustomEvent, MessageStripDomRef, Badge } from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/dist/post.js";
import "@ui5/webcomponents-icons/dist/tag.js";

export const BlogItems = ({ data }) => {
  const [current, setCurrent] = React.useState([]);
  const [paging, setPaging] = React.useState({ skip: 0, limit: 5 });

  React.useEffect(() => {
    if (data) {
      //@ts-ignore
      setCurrent(data.slice(paging.skip, paging.limit));
    }
  }, [data, paging]);

  const createTags = (frontmatter):React.ReactNode => {
    const tags = frontmatter.tags ? frontmatter.tags.split(';') : [];

    return tags.map(e => <Badge colorScheme="8" icon={<Icon name="tag"/>}>{e}</Badge>)
  }

  return (
    <div style={{ height: '100%' }}>
      {
        current.map(e =>
          <NotificationListItem
            key={e.frontmatter.date}
            avatar={<Icon name="post" />}
            footnotes={<>
            <Label>Sara Moreno</Label>
            <Label>{new Date(e.frontmatter.date).toDateString()}</Label>
            {
              createTags(e.frontmatter)
            }
            </>}
            style={{
              width: '100%'
            }}
            titleText={e.frontmatter.title}
          >
            <section style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: e.html }}></section>
          </NotificationListItem>
        )
      }
      {
        data.length > 5 &&
          <Bar
            design={BarDesign.Footer}>

            <Button disabled={paging.skip === 0} icon="nav-back" onClick={() => {
              const currentPage = { skip: paging.skip - 5, limit: paging.limit - 5 };

              setPaging(currentPage);
            }} />

            <Button disabled={current.length < 5} icon="navigation-right-arrow" onClick={() => {
              const currentPage = { skip: paging.skip + 5, limit: paging.limit + 5 };
              setPaging(currentPage);
            }} />
          </Bar>
          }
    </div>

  )
}
