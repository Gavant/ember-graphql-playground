// Types for compiled templates
declare module 'ember-graphql-playground/templates/*' {
    import { TemplateFactory } from 'htmlbars-inline-precompile';
    const tmpl: TemplateFactory;
    export default tmpl;
}
