import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,r,t as i}from"./stepper-DaAPAiRc.js";var a,o,s,c,l,u,d,f;e((()=>{a=t(),r(),o={title:`Components/Stepper`,component:n,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{activeStep:{control:{type:`number`,min:0,max:10}},orientation:{control:{type:`select`},options:[`horizontal`,`vertical`]}}},s={args:{activeStep:0},render:e=>(0,a.jsx)(`div`,{className:`w-full max-w-3xl`,children:(0,a.jsxs)(n,{...e,children:[(0,a.jsx)(i,{children:`Step 1`}),(0,a.jsx)(i,{children:`Step 2`}),(0,a.jsx)(i,{children:`Step 3`}),(0,a.jsx)(i,{children:`Step 4`})]})})},c={args:{activeStep:1},render:e=>(0,a.jsx)(`div`,{className:`w-full max-w-3xl`,children:(0,a.jsxs)(n,{...e,children:[(0,a.jsx)(i,{children:`Account`}),(0,a.jsx)(i,{children:`Profile`}),(0,a.jsx)(i,{children:`Confirm`})]})})},l={args:{activeStep:3},render:e=>(0,a.jsx)(`div`,{className:`w-full max-w-3xl`,children:(0,a.jsxs)(n,{...e,children:[(0,a.jsx)(i,{children:`Cart`}),(0,a.jsx)(i,{children:`Shipping`}),(0,a.jsx)(i,{children:`Payment`}),(0,a.jsx)(i,{children:`Done`})]})})},u={args:{activeStep:1,orientation:`vertical`},render:e=>(0,a.jsx)(`div`,{className:`w-full max-w-xs`,children:(0,a.jsxs)(n,{...e,children:[(0,a.jsx)(i,{children:`Account`}),(0,a.jsx)(i,{children:`Profile`}),(0,a.jsx)(i,{children:`Confirm`})]})})},d={render:()=>(0,a.jsxs)(`div`,{className:`w-full max-w-3xl space-y-8`,children:[(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`p`,{className:`text-sm text-muted-foreground mb-2`,children:`Step 1 of 4`}),(0,a.jsxs)(n,{activeStep:0,children:[(0,a.jsx)(i,{children:`Step 1`}),(0,a.jsx)(i,{children:`Step 2`}),(0,a.jsx)(i,{children:`Step 3`}),(0,a.jsx)(i,{children:`Step 4`})]})]}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`p`,{className:`text-sm text-muted-foreground mb-2`,children:`Step 2 of 4`}),(0,a.jsxs)(n,{activeStep:1,children:[(0,a.jsx)(i,{children:`Step 1`}),(0,a.jsx)(i,{children:`Step 2`}),(0,a.jsx)(i,{children:`Step 3`}),(0,a.jsx)(i,{children:`Step 4`})]})]}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`p`,{className:`text-sm text-muted-foreground mb-2`,children:`Step 3 of 4`}),(0,a.jsxs)(n,{activeStep:2,children:[(0,a.jsx)(i,{children:`Step 1`}),(0,a.jsx)(i,{children:`Step 2`}),(0,a.jsx)(i,{children:`Step 3`}),(0,a.jsx)(i,{children:`Step 4`})]})]}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`p`,{className:`text-sm text-muted-foreground mb-2`,children:`All Complete`}),(0,a.jsxs)(n,{activeStep:4,children:[(0,a.jsx)(i,{children:`Step 1`}),(0,a.jsx)(i,{children:`Step 2`}),(0,a.jsx)(i,{children:`Step 3`}),(0,a.jsx)(i,{children:`Step 4`})]})]})]})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    activeStep: 0
  },
  render: args => <div className="w-full max-w-3xl">\r
      <Stepper {...args}>\r
        <Step>Step 1</Step>\r
        <Step>Step 2</Step>\r
        <Step>Step 3</Step>\r
        <Step>Step 4</Step>\r
      </Stepper>\r
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    activeStep: 1
  },
  render: args => <div className="w-full max-w-3xl">\r
      <Stepper {...args}>\r
        <Step>Account</Step>\r
        <Step>Profile</Step>\r
        <Step>Confirm</Step>\r
      </Stepper>\r
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    activeStep: 3
  },
  render: args => <div className="w-full max-w-3xl">\r
      <Stepper {...args}>\r
        <Step>Cart</Step>\r
        <Step>Shipping</Step>\r
        <Step>Payment</Step>\r
        <Step>Done</Step>\r
      </Stepper>\r
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    activeStep: 1,
    orientation: "vertical"
  },
  render: args => <div className="w-full max-w-xs">\r
      <Stepper {...args}>\r
        <Step>Account</Step>\r
        <Step>Profile</Step>\r
        <Step>Confirm</Step>\r
      </Stepper>\r
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-3xl space-y-8">\r
      <div>\r
        <p className="text-sm text-muted-foreground mb-2">Step 1 of 4</p>\r
        <Stepper activeStep={0}>\r
          <Step>Step 1</Step>\r
          <Step>Step 2</Step>\r
          <Step>Step 3</Step>\r
          <Step>Step 4</Step>\r
        </Stepper>\r
      </div>\r
      <div>\r
        <p className="text-sm text-muted-foreground mb-2">Step 2 of 4</p>\r
        <Stepper activeStep={1}>\r
          <Step>Step 1</Step>\r
          <Step>Step 2</Step>\r
          <Step>Step 3</Step>\r
          <Step>Step 4</Step>\r
        </Stepper>\r
      </div>\r
      <div>\r
        <p className="text-sm text-muted-foreground mb-2">Step 3 of 4</p>\r
        <Stepper activeStep={2}>\r
          <Step>Step 1</Step>\r
          <Step>Step 2</Step>\r
          <Step>Step 3</Step>\r
          <Step>Step 4</Step>\r
        </Stepper>\r
      </div>\r
      <div>\r
        <p className="text-sm text-muted-foreground mb-2">All Complete</p>\r
        <Stepper activeStep={4}>\r
          <Step>Step 1</Step>\r
          <Step>Step 2</Step>\r
          <Step>Step 3</Step>\r
          <Step>Step 4</Step>\r
        </Stepper>\r
      </div>\r
    </div>
}`,...d.parameters?.docs?.source}}},f=[`Default`,`Step2`,`AllComplete`,`Vertical`,`AllSteps`]}))();export{l as AllComplete,d as AllSteps,s as Default,c as Step2,u as Vertical,f as __namedExportsOrder,o as default};