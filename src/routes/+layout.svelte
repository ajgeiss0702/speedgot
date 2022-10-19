<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap-icons/font/bootstrap-icons.css';
    import '$lib/css/base.css';
    import 'nprogress/nprogress.css';
    import {navigating} from "$app/stores";
    import NProgress from 'nprogress';
    import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Styles} from "sveltestrap";
    import {onMount} from "svelte";

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

    let navOpen = false;
    const toggleNav = () => navOpen = !navOpen;

    $: console.log({ navOpen })
</script>
<style>
    div {
        text-align: center;
        margin-top: 1em;
    }
</style>
<Navbar color="secondary" warnbing expand="md">
    <NavbarBrand href="/">Speedgot</NavbarBrand>
    <NavbarToggler on:click={toggleNav} />
    <Collapse isOpen= {navOpen} navbar expand="md" >
        <Nav class="me-auto" navbar>
            <NavItem>
                <NavLink href="/resources">Resources</NavLink>
            </NavItem>
        </Nav>
    </Collapse>
</Navbar>
<div>
    <slot/>
</div>