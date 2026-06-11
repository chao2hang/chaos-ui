import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./utils-CMVnEVHk.js";import{r as i,t as a}from"./button-CoDyUfHr.js";import{E as o,S as s,cn as c,t as l}from"./lucide-react-CxNzvEkP.js";import{c as u,i as d,o as f,r as p,s as m,t as h}from"./card-kUQbP-z5.js";import{a as g,i as _,n as v,r as y,t as b}from"./tabs-hLc_jrUQ.js";function x({title:e,subtitle:t,children:n,tabs:i,actions:o,onBack:s,className:l}){return(0,S.jsxs)(`div`,{className:r(`flex flex-col gap-6`,l),children:[(0,S.jsxs)(`div`,{className:`flex items-start gap-4`,children:[s&&(0,S.jsx)(a,{variant:`ghost`,size:`icon-sm`,onClick:s,className:`mt-0.5`,children:(0,S.jsx)(c,{})}),(0,S.jsxs)(`div`,{className:`flex-1`,children:[(0,S.jsx)(`h1`,{className:`text-2xl font-bold tracking-tight`,children:e}),t&&(0,S.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:t})]}),o&&(0,S.jsx)(`div`,{className:`flex items-center gap-2`,children:o})]}),i?(0,S.jsxs)(b,{defaultValue:i[0].value,children:[(0,S.jsx)(y,{variant:`line`,children:i.map(e=>(0,S.jsx)(_,{value:e.value,children:e.label},e.value))}),i.map(e=>(0,S.jsx)(v,{value:e.value,className:`mt-4`,children:e.content},e.value))]}):n]})}var S,C=e((()=>{S=t(),n(),i(),g(),l(),x.__docgenInfo={description:``,methods:[],displayName:`DetailLayout`,props:{title:{required:!0,tsType:{name:`string`},description:``},subtitle:{required:!1,tsType:{name:`string`},description:``},children:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},tabs:{required:!1,tsType:{name:`Array`,elements:[{name:`DetailTab`}],raw:`DetailTab[]`},description:``},actions:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},onBack:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})),w,T,E,D,O;e((()=>{w=t(),C(),i(),u(),l(),T={title:`Layouts/DetailLayout`,component:x,tags:[`autodocs`]},E={args:{title:`Order #ORD-001`,subtitle:`Placed on January 15, 2024`,actions:(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(a,{variant:`outline`,size:`sm`,children:[(0,w.jsx)(o,{className:`size-4 mr-1`}),`Edit`]}),(0,w.jsxs)(a,{variant:`destructive`,size:`sm`,children:[(0,w.jsx)(s,{className:`size-4 mr-1`}),`Delete`]})]}),children:(0,w.jsxs)(h,{children:[(0,w.jsxs)(f,{children:[(0,w.jsx)(m,{children:`Order Details`}),(0,w.jsx)(d,{children:`View order information`})]}),(0,w.jsx)(p,{children:(0,w.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Order details content goes here.`})})]})}},D={args:{title:`User Profile`,subtitle:`View and manage user information`,tabs:[{value:`overview`,label:`Overview`,content:(0,w.jsx)(h,{children:(0,w.jsx)(p,{className:`pt-6`,children:(0,w.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Overview content`})})})},{value:`activity`,label:`Activity`,content:(0,w.jsx)(h,{children:(0,w.jsx)(p,{className:`pt-6`,children:(0,w.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Activity log content`})})})},{value:`settings`,label:`Settings`,content:(0,w.jsx)(h,{children:(0,w.jsx)(p,{className:`pt-6`,children:(0,w.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Settings content`})})})}]}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Order #ORD-001",
    subtitle: "Placed on January 15, 2024",
    actions: <>\r
        <Button variant="outline" size="sm">\r
          <EditIcon className="size-4 mr-1" />\r
          Edit\r
        </Button>\r
        <Button variant="destructive" size="sm">\r
          <TrashIcon className="size-4 mr-1" />\r
          Delete\r
        </Button>\r
      </>,
    children: <Card>\r
        <CardHeader>\r
          <CardTitle>Order Details</CardTitle>\r
          <CardDescription>View order information</CardDescription>\r
        </CardHeader>\r
        <CardContent>\r
          <p className="text-sm text-muted-foreground">Order details content goes here.</p>\r
        </CardContent>\r
      </Card>
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    title: "User Profile",
    subtitle: "View and manage user information",
    tabs: [{
      value: "overview",
      label: "Overview",
      content: <Card>\r
            <CardContent className="pt-6">\r
              <p className="text-sm text-muted-foreground">Overview content</p>\r
            </CardContent>\r
          </Card>
    }, {
      value: "activity",
      label: "Activity",
      content: <Card>\r
            <CardContent className="pt-6">\r
              <p className="text-sm text-muted-foreground">Activity log content</p>\r
            </CardContent>\r
          </Card>
    }, {
      value: "settings",
      label: "Settings",
      content: <Card>\r
            <CardContent className="pt-6">\r
              <p className="text-sm text-muted-foreground">Settings content</p>\r
            </CardContent>\r
          </Card>
    }]
  }
}`,...D.parameters?.docs?.source}}},O=[`Default`,`WithTabs`]}))();export{E as Default,D as WithTabs,O as __namedExportsOrder,T as default};