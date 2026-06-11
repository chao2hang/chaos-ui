import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./utils-CMVnEVHk.js";import{r as i,t as a}from"./button-CoDyUfHr.js";import{a as o,c as s,i as c,l,o as u,r as d,s as f,t as p}from"./dialog-DUiQ0ThU.js";function m(e){return(0,C.jsx)(p,{...e})}function h(e){return(0,C.jsx)(s,{...e})}function g({className:e,...t}){return(0,C.jsx)(d,{className:r(`max-w-md`,e),...t})}function _(e){return(0,C.jsx)(u,{...e})}function v(e){return(0,C.jsx)(f,{...e})}function y(e){return(0,C.jsx)(c,{...e})}function b(e){return(0,C.jsx)(o,{...e})}function x({className:e,...t}){return(0,C.jsx)(a,{className:e,...t})}function S({className:e,...t}){return(0,C.jsx)(a,{variant:`outline`,className:e,...t})}var C,w=e((()=>{C=t(),n(),l(),i(),m.__docgenInfo={description:``,methods:[],displayName:`AlertDialog`},h.__docgenInfo={description:``,methods:[],displayName:`AlertDialogTrigger`},g.__docgenInfo={description:``,methods:[],displayName:`AlertDialogContent`},_.__docgenInfo={description:``,methods:[],displayName:`AlertDialogHeader`},v.__docgenInfo={description:``,methods:[],displayName:`AlertDialogTitle`},y.__docgenInfo={description:``,methods:[],displayName:`AlertDialogDescription`},b.__docgenInfo={description:``,methods:[],displayName:`AlertDialogFooter`},x.__docgenInfo={description:``,methods:[],displayName:`AlertDialogAction`},S.__docgenInfo={description:``,methods:[],displayName:`AlertDialogCancel`}})),T,E,D,O,k;e((()=>{T=t(),w(),i(),E={title:`Components/AlertDialog`,component:m,tags:[`autodocs`]},D={render:()=>(0,T.jsxs)(m,{children:[(0,T.jsx)(h,{render:(0,T.jsx)(a,{variant:`outline`}),children:`Open Alert Dialog`}),(0,T.jsxs)(g,{children:[(0,T.jsxs)(_,{children:[(0,T.jsx)(v,{children:`Are you absolutely sure?`}),(0,T.jsx)(y,{children:`This action cannot be undone. This will permanently delete your account.`})]}),(0,T.jsxs)(b,{children:[(0,T.jsx)(S,{children:`Cancel`}),(0,T.jsx)(x,{children:`Continue`})]})]})]})},O={render:()=>(0,T.jsxs)(m,{children:[(0,T.jsx)(h,{render:(0,T.jsx)(a,{variant:`destructive`}),children:`Delete Account`}),(0,T.jsxs)(g,{children:[(0,T.jsxs)(_,{children:[(0,T.jsx)(v,{children:`Delete Account?`}),(0,T.jsx)(y,{children:`This will permanently delete your account and all associated data.`})]}),(0,T.jsxs)(b,{children:[(0,T.jsx)(S,{children:`Cancel`}),(0,T.jsx)(x,{className:`bg-destructive text-white hover:bg-destructive/90`,children:`Delete`})]})]})]})},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <AlertDialog>\r
      <AlertDialogTrigger render={<Button variant="outline" />}>\r
        Open Alert Dialog\r
      </AlertDialogTrigger>\r
      <AlertDialogContent>\r
        <AlertDialogHeader>\r
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>\r
          <AlertDialogDescription>\r
            This action cannot be undone. This will permanently delete your account.\r
          </AlertDialogDescription>\r
        </AlertDialogHeader>\r
        <AlertDialogFooter>\r
          <AlertDialogCancel>Cancel</AlertDialogCancel>\r
          <AlertDialogAction>Continue</AlertDialogAction>\r
        </AlertDialogFooter>\r
      </AlertDialogContent>\r
    </AlertDialog>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <AlertDialog>\r
      <AlertDialogTrigger render={<Button variant="destructive" />}>\r
        Delete Account\r
      </AlertDialogTrigger>\r
      <AlertDialogContent>\r
        <AlertDialogHeader>\r
          <AlertDialogTitle>Delete Account?</AlertDialogTitle>\r
          <AlertDialogDescription>\r
            This will permanently delete your account and all associated data.\r
          </AlertDialogDescription>\r
        </AlertDialogHeader>\r
        <AlertDialogFooter>\r
          <AlertDialogCancel>Cancel</AlertDialogCancel>\r
          <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90">\r
            Delete\r
          </AlertDialogAction>\r
        </AlertDialogFooter>\r
      </AlertDialogContent>\r
    </AlertDialog>
}`,...O.parameters?.docs?.source}}},k=[`Default`,`Destructive`]}))();export{D as Default,O as Destructive,k as __namedExportsOrder,E as default};