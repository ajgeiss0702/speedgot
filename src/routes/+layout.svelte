<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import '$lib/base.css';
    import 'nprogress/nprogress.css';
    import {navigating} from "$app/stores";
    import NProgress from 'nprogress';
    import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "sveltestrap";

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
</script>
<style>
    div {
        text-align: center;
        margin-top: 1em;
    }
</style>
<Navbar color="warning" warnbing expand="md">
    <NavbarBrand href="/">Speedgot</NavbarBrand>
    <NavbarToggler on:click={() => (navOpen = !navOpen)} />
    <Collapse {navOpen} navbar expand="md" on:update={e => navOpen = e.detail.isOpen}>
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