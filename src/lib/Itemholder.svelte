<script lang="ts">

    interface Item {
        href: string;
        image: string;
        name: string;
        line1: string;
        line2: string;
    }

    export let items: Item[] = [];


</script>

<style lang="less">
  @import "colors";

  #itemholder {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: auto;
    align-items: center;
    justify-content: center;
    .item {
      margin-top: 10px;
      margin-right: 10px;
      background: @items;
      border-radius: @border-radiuspx;

      img {
        border-top-left-radius: @border-radiuspx;
        border-top-right-radius: @border-radiuspx;
        width: 250px;
        height: 250px;
        object-fit: cover;
      }

      #item-text {
        display: flex;
        flex-direction: column;
        align-items: center;

        p, h3 {
          color: @text;
        }
      }
    }

  }
</style>

<div id="itemholder">
    {#each items as item}
        <a class="item" href="{item.href}">
            <img src="{item.image}" alt="Picture of {item.name}">
            <div id="item-text">
                <h3>{item.name}</h3>
                <p>{item.line1}</p>
                <p>{item.line2}</p>
            </div>
        </a>
    {/each}

</div>