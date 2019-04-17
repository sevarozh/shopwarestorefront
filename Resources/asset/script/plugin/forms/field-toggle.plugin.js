import Plugin from 'asset/script/helper/plugin/plugin.class';
import DomAccess from 'asset/script/helper/dom-access.helper';


export default class FieldTogglePlugin extends Plugin {

    static options = {

        /**
         * the class which should be applied
         * when the target should be hidden
         */
        hiddenCls: 'd-none',

        /**
         * the attribute for the target selector
         */
        targetDataAttribute: 'data-field-toggle-target',

        /**
         * on which value the target should be hidden
         */
        valueDataAttribute: 'data-field-toggle-value',

        /**
         * the class which gets applied
         * when the field previously had the required attribute
         */
        wasRequiredCls: 'js-field-toggle-was-required',

        /**
         * the class which gets applied
         * when the field previously had the disabled attribute
         */
        wasDisabledCls: 'js-field-toggle-was-disabled',
    };

    init() {
        this._getTargets();
        this._getControlValue();
        this._registerEvents();

        // Since the target could be hidden from the start,
        // the onChange function must be called.
        this._onChange();
    }

    /**
     * sets the list of targets
     * found be the passed selector
     *
     * @private
     */
    _getTargets() {
        const selector = DomAccess.getDataAttribute(this.el, this.options.targetDataAttribute);
        this._targets = DomAccess.querySelectorAll(document, selector);
    }


    /**
     * sets the value on which the the
     * targets should be toggled
     *
     * @private
     */
    _getControlValue() {
        this._value = DomAccess.getDataAttribute(this.el, this.options.valueDataAttribute);
    }

    /**
     * registers all needed events
     *
     * @private
     */
    _registerEvents() {
        this.el.removeEventListener('change', this._onChange.bind(this));
        this.el.addEventListener('change', this._onChange.bind(this));
    }

    /**
     * on change callback for the element
     *
     * @private
     */
    _onChange() {
        const shouldHide = this._shouldHideTarget();

        this._targets.forEach(node => {
            if (shouldHide) {
                this._hideTarget(node);
            } else {
                this._showTarget(node);
            }
        });
    }


    /**
     * returns whether or not the
     * target should be hidden
     *
     * @returns {*}
     * @private
     */
    _shouldHideTarget() {
        const type = this.el.type;
        if (type === 'checkbox' || type === 'radio') {
            return this.el.checked === this._value;
        } else {
            return this.el.value === this._value;
        }
    }

    /**
     * hides the given target element
     *
     * @param target
     * @private
     */
    _hideTarget(target) {
        const fields = this._getFields(target);
        fields.forEach(field => {
            const isRequired = DomAccess.hasAttribute(field, 'required');
            if (isRequired) {
                field.classList.add(this.options.wasRequiredCls);
                field.removeAttribute('required');
            }

            const isDisabled = DomAccess.hasAttribute(field, 'disabled');
            field.setAttribute('disabled', 'disabled');
            if (isDisabled) {
                field.classList.add(this.options.wasDisabledCls);
            }
        });

        target.classList.add(this.options.hiddenCls);
    }

    /**
     * shows the given target element
     *
     * @param target
     * @private
     */
    _showTarget(target) {
        const fields = this._getFields(target);
        fields.forEach(field => {
            if (field.classList.contains(this.options.wasRequiredCls)) {
                field.classList.remove(this.options.wasRequiredCls);
                field.setAttribute('required', 'required');
            }

            if (!field.classList.contains(this.options.wasDisabledCls)) {
                field.removeAttribute('disabled');
            }
        });

        target.classList.remove(this.options.hiddenCls);
    }

    /**
     * returns all fields inside the form
     *
     * @param target
     * @returns {NodeList|false}
     *
     * @private
     */
    _getFields(target) {
        return DomAccess.querySelectorAll(target, 'input, select, textarea', false);
    }

}
