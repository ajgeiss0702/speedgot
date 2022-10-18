<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import '$lib/base.css';
    import 'nprogress/nprogress.css';
    import {navigating} from "$app/stores";
    import NProgress from 'nprogress';

    NProgress.configure({
        // Full list: https://github.com/rstacruz/nprogress#configuration
        minimum: 0.16
    });

    $: {
        if ($navigating) {
            NProgress.start();
        }
        if (!$navigating) {
            NProgress.done();
        }
    }
</script>
<style>
    div {
        text-align: center;
    }
</style>
<div>
    <slot/>
</div>