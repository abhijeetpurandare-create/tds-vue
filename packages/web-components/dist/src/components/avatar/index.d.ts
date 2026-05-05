import { LitElement } from 'lit';
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'round' | 'square';
export type AvatarType = 'initials' | 'image' | 'numeric' | 'icon';
export type AvatarStatusDotType = 'active' | 'inactive' | 'idle' | 'brand';
export declare class TarmacAvatar extends LitElement {
    avatarType: AvatarType;
    shape: AvatarShape;
    size: AvatarSize;
    src: string;
    alt: string;
    showStatus: boolean;
    statusType: AvatarStatusDotType;
    isDisabled: boolean;
    isGhost: boolean;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    render(): import('lit').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-avatar': TarmacAvatar;
    }
}
