export const threeAdapter: {
    detect: (t: any) => boolean;
    targetAdapters: {
        detect: (t: any) => boolean;
        props: Record<string, import("../registry.js").TargetAdapterEntry>;
        registerProperty(name: string, getter: (t: any) => any, setter: (target: any, value: number, tween: any) => void, gate?: (t: any) => boolean): void;
    }[];
    propertyResolvers: ((target: any, name: string) => import("../registry.js").TargetAdapterEntry | null)[];
    registerTargetAdapter(detect: (t: any) => boolean): {
        detect: (t: any) => boolean;
        props: Record<string, import("../registry.js").TargetAdapterEntry>;
        registerProperty(name: string, getter: (t: any) => any, setter: (target: any, value: number, tween: any) => void, gate?: (t: any) => boolean): void;
    };
    registerPropertyResolver(resolver: (target: any, name: string) => TargetAdapterEntry | null): void;
};
