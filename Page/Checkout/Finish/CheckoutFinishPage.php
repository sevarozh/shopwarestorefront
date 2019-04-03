<?php declare(strict_types=1);

namespace Shopware\Storefront\Page\Checkout\Finish;

use Shopware\Core\Checkout\Order\OrderEntity;
use Shopware\Storefront\Framework\Page\PageWithHeader;

class CheckoutFinishPage extends PageWithHeader
{
    /**
     * @var OrderEntity
     */
    protected $order;

    public function getOrder(): OrderEntity
    {
        return $this->order;
    }

    public function setOrder(OrderEntity $order): void
    {
        $this->order = $order;
    }
}
