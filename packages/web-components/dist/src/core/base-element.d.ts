import { LitElement, css, unsafeCSS } from 'lit';
export declare class TarmacBaseElement extends LitElement {
    /**
     * Shared token styles injected into every component's shadow root.
     * Subclasses should include this in their `static styles` array.
     */
    static tokenStyles: import('lit').CSSResult;
    /**
     * Base reset styles applied to all Tarmac components.
     * Ensures consistent box-sizing and font-family.
     */
    static baseStyles: import('lit').CSSResult;
}
export { css, unsafeCSS };
