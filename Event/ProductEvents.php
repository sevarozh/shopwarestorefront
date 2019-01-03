<?php declare(strict_types=1);

namespace Shopware\Storefront\Event;

use Shopware\Storefront\Page\ProductDetail\ProductDetailPageLoadedEvent;
use Shopware\Storefront\Page\ProductDetail\ProductDetailPageRequestEvent;
use Shopware\Storefront\Pagelet\ProductDetail\ProductDetailPageletRequestEvent;

class ProductEvents
{
    /**
     * Dispatched as soon as the productpage has been loaded
     *
     * @Event("ProductProductPageLoadedEvent")
     */
    public const LOADED = ProductDetailPageLoadedEvent::NAME;

    /**
     * Fired when a product page request comes in and transformed to the DetailRequest object
     *
     * @Event("ProductDetailPageRequestEvent")
     */
    public const DETAIL_PAGE_REQUEST = ProductDetailPageRequestEvent::NAME;

    /**
     * Fired when a product page request comes in and transformed to the DetailRequest object
     *
     * @Event("ProductDetailPageletRequestEvent")
     */
    public const DETAIL_PAGELET_REQUEST = ProductDetailPageletRequestEvent::NAME;
}
