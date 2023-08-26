const cssVars = getComputedStyle(document.body);

export default function BreakPoint() {

    const bkp = {
        xs: JSON.parse(cssVars.getPropertyValue('--rs-xs')), /* XS <576px */
        sm: JSON.parse(cssVars.getPropertyValue('--rs-sm')), /* SM ≥576px */
        md: JSON.parse(cssVars.getPropertyValue('--rs-md')), /* MD ≥768px */
        lg: JSON.parse(cssVars.getPropertyValue('--rs-lg')), /* LG ≥992px */
        xl: JSON.parse(cssVars.getPropertyValue('--rs-xl')), /* XL ≥1200px */
        xxl: JSON.parse(cssVars.getPropertyValue('--rs-xxl')), /* XXL ≥1400px */
    }

    const ndim = {
        width: window.screen.width,
        height: window.screen.height,
        breakpoint: null,
    };

    if(ndim.width >= bkp.xxl) {
        ndim.breakpoint = 'xxl';  
    } else if(ndim.width >= bkp.xl) {
        ndim.breakpoint = 'xl';  
    } else if(ndim.width >= bkp.lg) {
        ndim.breakpoint = 'lg';  
    } else if(ndim.width >= bkp.md) {
        ndim.breakpoint = 'md';  
    } else if(ndim.width >= bkp.sm) {
        ndim.breakpoint = 'sm';  
    } else {
        ndim.breakpoint = 'xs';  
    } return ndim;

} 

