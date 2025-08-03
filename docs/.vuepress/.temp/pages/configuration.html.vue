<template><div><h1 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration"><span>Configuration</span></a></h1>
<h2 id="props-events" tabindex="-1"><a class="header-anchor" href="#props-events"><span>Props &amp; Events</span></a></h2>
<p>These are all of the props and events that can be defined on the Vue Query Builder component. See below for a detailed explanation of each one.</p>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html"><pre v-pre><code class="language-html"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>vue-query-builder</span></span>
<span class="line">  <span class="token attr-name">:rules</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>rules<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token attr-name">:maxDepth</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>3<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token attr-name">:labels</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>labels<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token attr-name">:styled</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>styled<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>query<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>vue-query-builder</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rules" tabindex="-1"><a class="header-anchor" href="#rules"><span>rules <Badge text="required" type="error" vertical="middle" /> <Badge text="Type: Array" vertical="middle" /></span></a></h3>
<p>The <code v-pre>rules</code> prop provides all of the rules that can be selected within the UI and added to a group.</p>
<p>The rules prop is an array of objects. A simple set of rules might look like this:</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code class="language-javascript"><span class="line">rules <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"text"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">"vegetable"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">"Vegetable"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"radio"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">"fruit"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">"Fruit"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token literal-property property">choices</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">            <span class="token punctuation">{</span><span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">"Apple"</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">"apple"</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">{</span><span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">"Banana"</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">"banana"</span><span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Each object in the <code v-pre>rules</code> array can contain the following properties:</p>
<table class="table table-striped">
  <thead>
    <tr>
      <th>Property</th>
      <th>Possible Values</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>type</td>
      <td>String from this list: <code>"text", "numeric", "custom", "radio", "checkbox", "select", "custom-component"</code></td>
      <td><Badge text="required" type="error" vertical="middle" /> Determines the basic template for conditionals based on this rule. Each type has some basic defaults that can be overridden. You can include a custom component as long as it interacts properly with <code>v-model</code> (see more details <a href="https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events">in the Vue docs here</a>).</td>
    </tr>
    <tr>
      <td>id</td>
      <td>Any string</td>
      <td>Optional - will be included in the final query object. If not set, defaults to a sensible value. For custom components, this will be the component's HTML tag.</td>
    </tr>
    <tr>
      <td>label</td>
      <td>Any string</td>
      <td><Badge text="required" type="error" vertical="middle" /> Label to be displayed to the user.</td>
    </tr>
    <tr>
      <td>operators</td>
      <td>Array of strings</td>
      <td>Optional. Override the operators for the rule type. If not defined, sensible defaults are provided.<br><br>
      Ex: <code>operators: ['=','&lt;&gt;','&lt;','&lt;=','&gt;','&gt;=']</code></td>
    </tr>
    <tr>
      <td>choices</td>
      <td>Array of objects, each with a `label` and `value` property.</td>
      <td><Badge text="may be required" type="error" vertical="middle" /> Required for checkbox, radio, and select rule types. Defines the individual radio and checkbox inputs, or select options. Select inputs will default to the first item in the `choices` list; if you want an empty option
      you must provide it yourself. <br><br>
      Ex: <code>choices: [{label: "Foo", value: "foo"}, {label: "Bar", value: "bar"}]</code>
      </td>
    </tr>
    <tr>
      <td>operands</td>
      <td>Array of strings or numbers</td>
      <td>Optional. Allows you to set a dropdown as the left side of the conditional. For example, you may have a rule for 'Address' that lets the
      user choose which kind of address the rule is referring to:<br><br>
      Ex: <code>operands: ['Home Address','Work Address']</code></td>
    </tr>
    <tr>
      <td>inputType</td>
      <td>String with an HTML input type</td>
      <td>Optional. Override the HTML input type for a rule type.<br><br>Ex: <code>inputType: "email"</code></td>
    </tr>
    <tr>
      <td>default</td>
      <td>Mixed</td>
      <td>Optional. Provide a default value. Currently only used for custom components.<br><br>Ex: <code>default: 123</code></td>
    </tr>
    <tr>
      <td>component</td>
      <td>An imported component</td>
      <td><Badge text="may be equired" type="error" vertical="middle" /> Required for type <code>custom-component</code>. <br><br>Ex: <code>component: RangeInput</code></td>
    </tr>
  </tbody>
</table>
<hr>
<h3 id="maxdepth" tabindex="-1"><a class="header-anchor" href="#maxdepth"><span>maxDepth <Badge text="optional" type="warn" vertical="middle" /> <Badge text="Type: Number" vertical="middle" /> <Badge text="Default: 3" vertical="middle" /></span></a></h3>
<p>Defines the maximum depth (nested layers) of the query.</p>
<hr>
<h3 id="labels" tabindex="-1"><a class="header-anchor" href="#labels"><span>labels <Badge text="optional" type="warn" vertical="middle" /> <Badge text="Type: Object" vertical="middle" /></span></a></h3>
<p>Replace the default labels used in the UI. The default values are:</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"matchType"</span><span class="token operator">:</span> <span class="token string">"Match Type"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"matchTypeAll"</span><span class="token operator">:</span> <span class="token string">"All"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"matchTypeAny"</span><span class="token operator">:</span> <span class="token string">"Any"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"addRule"</span><span class="token operator">:</span> <span class="token string">"Add Rule"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"removeRule"</span><span class="token operator">:</span> <span class="token string">"&amp;times;"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"addGroup"</span><span class="token operator">:</span> <span class="token string">"Add Group"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"removeGroup"</span><span class="token operator">:</span> <span class="token string">"&amp;times;"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"textInputPlaceholder"</span><span class="token operator">:</span> <span class="token string">"value"</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="v-model" tabindex="-1"><a class="header-anchor" href="#v-model"><span>v-model <Badge text="optional" type="warn" vertical="middle" /> <Badge text="Type: Object" vertical="middle" /></span></a></h3>
<p>Provide a value to the <code v-pre>v-model</code> attribute to give some initial state to the query builder, and to automatically get the updated value of the query as it changes. If you don't want to provide initial state, you can just pass an empty object:</p>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html"><pre v-pre><code class="language-html"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>vue-query-builder</span></span>
<span class="line">  <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>query<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>vue-query-builder</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code class="language-javascript"><span class="line">  <span class="token comment">// Inside your Vue app / component</span></span>
<span class="line">  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">query</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="styled" tabindex="-1"><a class="header-anchor" href="#styled"><span>styled <Badge text="optional" type="warn" vertical="middle" /> <Badge text="Type: Boolean" vertical="middle" /> <Badge text="Default: true" vertical="middle" /></span></a></h3>
<p>When true, the component will include Bootstrap 3 CSS classes and some basic styling.</p>
</div></template>


