import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./utils-CMVnEVHk.js";import{r as i,t as a}from"./button-CoDyUfHr.js";import{n as o,t as s}from"./dist-BiFzeHEN.js";import{I as c,t as l}from"./lucide-react-CxNzvEkP.js";import{c as u,r as d,t as f}from"./card-kUQbP-z5.js";function p({className:e,size:t,padding:n,center:i,children:a,...o}){return(0,g.jsx)(`div`,{"data-slot":`page-container`,className:r(_({size:t,padding:n,center:i,className:e})),...o,children:a})}function m({className:e,title:t,description:n,actions:i,breadcrumb:a,...o}){return(0,g.jsxs)(`div`,{"data-slot":`page-header`,className:r(`space-y-2`,e),...o,children:[a,(0,g.jsxs)(`div`,{className:`flex items-start justify-between gap-4`,children:[(0,g.jsxs)(`div`,{className:`space-y-1`,children:[(0,g.jsx)(`h1`,{className:`text-2xl font-bold tracking-tight`,children:t}),n&&(0,g.jsx)(`p`,{className:`text-muted-foreground`,children:n})]}),i&&(0,g.jsx)(`div`,{className:`flex items-center gap-2`,children:i})]})]})}function h({className:e,children:t,...n}){return(0,g.jsx)(`div`,{"data-slot":`page-content`,className:r(`space-y-6`,e),...n,children:t})}var g,_,v=e((()=>{g=t(),n(),o(),_=s(`w-full`,{variants:{size:{sm:`max-w-2xl`,default:`max-w-5xl`,lg:`max-w-7xl`,full:`max-w-full`,none:``},padding:{none:`p-0`,sm:`p-4`,default:`p-6`,lg:`p-8`},center:{true:`mx-auto`,false:``}},defaultVariants:{size:`default`,padding:`default`,center:!0}}),p.__docgenInfo={description:``,methods:[],displayName:`PageContainer`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}},composes:[`VariantProps`]},m.__docgenInfo={description:``,methods:[],displayName:`PageHeader`,props:{title:{required:!0,tsType:{name:`string`},description:``},description:{required:!1,tsType:{name:`string`},description:``},actions:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},breadcrumb:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}},h.__docgenInfo={description:``,methods:[],displayName:`PageContent`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}}})),y,b,x,S,C;e((()=>{y=t(),v(),i(),u(),l(),b={title:`Components/PageContainer`,component:p,tags:[`autodocs`]},x={render:()=>(0,y.jsxs)(p,{children:[(0,y.jsx)(m,{title:`Dashboard`,description:`Welcome to your dashboard`,actions:(0,y.jsxs)(a,{children:[(0,y.jsx)(c,{className:`size-4 mr-1`}),` Add New`]})}),(0,y.jsx)(h,{children:(0,y.jsx)(`div`,{className:`grid gap-4 md:grid-cols-2`,children:Array.from({length:4}).map((e,t)=>(0,y.jsx)(f,{children:(0,y.jsx)(d,{className:`pt-6`,children:(0,y.jsxs)(`p`,{className:`text-sm text-muted-foreground`,children:[`Content `,t+1]})})},t))})})]})},S={render:()=>(0,y.jsxs)(p,{size:`sm`,children:[(0,y.jsx)(m,{title:`Settings`,description:`Manage your settings`}),(0,y.jsx)(h,{children:(0,y.jsx)(f,{children:(0,y.jsx)(d,{className:`pt-6`,children:(0,y.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Settings content goes here.`})})})})]})},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <PageContainer>\r
      <PageHeader title="Dashboard" description="Welcome to your dashboard" actions={<Button><PlusIcon className="size-4 mr-1" /> Add New</Button>} />\r
      <PageContent>\r
        <div className="grid gap-4 md:grid-cols-2">\r
          {Array.from({
          length: 4
        }).map((_, i) => <Card key={i}>\r
              <CardContent className="pt-6">\r
                <p className="text-sm text-muted-foreground">Content {i + 1}</p>\r
              </CardContent>\r
            </Card>)}\r
        </div>\r
      </PageContent>\r
    </PageContainer>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <PageContainer size="sm">\r
      <PageHeader title="Settings" description="Manage your settings" />\r
      <PageContent>\r
        <Card>\r
          <CardContent className="pt-6">\r
            <p className="text-sm text-muted-foreground">Settings content goes here.</p>\r
          </CardContent>\r
        </Card>\r
      </PageContent>\r
    </PageContainer>
}`,...S.parameters?.docs?.source}}},C=[`Default`,`Small`]}))();export{x as Default,S as Small,C as __namedExportsOrder,b as default};