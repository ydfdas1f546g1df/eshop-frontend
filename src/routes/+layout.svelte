<script lang="ts">
    import {onMount} from 'svelte';
    import TopAppBar, {
        Row,
        Section,
        Title,
        AutoAdjust,
    } from '@smui/top-app-bar';
    import {clickOutside} from '$lib/clickOutside';
    import IconButton, {Icon} from '@smui/icon-button';
    import {mdiMenu, mdiWeatherSunny, mdiWeatherNight} from '@mdi/js';
    import Drawer, {
        Content,
        Header,
        Title as DrawerTitle,
        Subtitle,
    } from '@smui/drawer';
    import List, {Item, Text, Graphic, Separator, Subheader} from '@smui/list';
    import "./+layout.less";
    import Button from "@smui/button";

    let topAppBar: TopAppBar;
    let darkTheme: boolean | undefined = undefined;
    let menuOpen: boolean = false;
    let drawer;
    let active: String = '';
    let loggedIn: boolean = false;
    let url: string = '';
    let usercookie: string = '';


    onMount(() => {
        url = location.pathname;
        active = (url === '/') ? 'homepage' : url.split('/')[1];
        console.log(active);
        usercookie = document.cookie.split(';').find(row => row.startsWith('user='));
    });

    function setActive(value: string) {
        active = value;
        menuOpen = false;
    }


</script>


    <TopAppBar bind:this={topAppBar} variant="standard">
        <Row>
            <Section>
                <IconButton on:click={() => (menuOpen = !menuOpen)}>
                    <Icon tag="svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d={mdiMenu}/>
                    </Icon>
                </IconButton>
                <Title on:click={() => {window.location.assign("/")}}>Shop</Title>
            </Section>
            <Section toolbar align="end">
                <!-- Make a login button -->
                {#if usercookie}
                    <Button on:click={() => {window.location.assign("/logout")}} id="logout">
                        <span>Logout</span>
                    </Button>
                {:else}
                    <Button on:click={() => {window.location.assign("/login")}} id="login">
                        <span>Login</span>
                    </Button>
                {/if}
            </Section>
        </Row>
    </TopAppBar>
    <div id="DrawerCloser" use:clickOutside on:click_outside={() => (menuOpen = false)}>
        <Drawer variant="modal" bind:this={drawer}
                bind:open={menuOpen}>
            <Header>
                <DrawerTitle>Shop</DrawerTitle>
                <Subtitle>It's the best fake shop app drawer.</Subtitle>
            </Header>
            <Content>
                <List>
                    <Item
                            href="/"
                            on:click={() => setActive('Homepage')}
                            activated={active === 'Homepage'}
                    >
                        <Graphic class="material-icons" aria-hidden="true">home</Graphic>
                        <Text>Homepage</Text>
                    </Item>
                    <Item
                            href="/categories"
                            on:click={() => setActive('categories')}
                            activated={active === 'categories'}
                    >
                        <Graphic class="material-icons" aria-hidden="true">explore</Graphic>
                        <Text>Categories</Text>
                    </Item>
                    <Item
                            href="shopping_cart"
                            on:click={() => setActive('shopping_cart')}
                            activated={active === 'shopping_cart'}
                    >
                        <Graphic class="material-icons" aria-hidden="true">shopping_cart</Graphic>
                        <Text>Shopping Cart</Text>
                    </Item>
                    <Separator/>
                    <Subheader tag="h6">Labels</Subheader>
                    <Item
                            href="login"
                            on:click={() => setActive('login')}
                            activated={active === 'login'}
                    >
                        <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
                        <Text>Family</Text>
                    </Item>
                    <Item
                            href="javascript:void(0)"
                            on:click={() => setActive('Friends')}
                            activated={active === 'Friends'}
                    >
                        <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
                        <Text>Friends</Text>
                    </Item>
                    <Item
                            href="javascript:void(0)"
                            on:click={() => setActive('Work')}
                            activated={active === 'Work'}
                    >
                        <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
                        <Text>Work</Text>
                    </Item>
                </List>
            </Content>
        </Drawer>
    </div>

    <AutoAdjust {topAppBar}>
        <slot/>
    </AutoAdjust>
