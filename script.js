document.addEventListener('DOMContentLoaded', function() {
    // DOM要素の取得
    const generatedUrl = document.getElementById('generatedUrl');
    const copyButton = document.getElementById('copyButton');
    const clearButton = document.getElementById('clearButton');
    const inputs = document.querySelectorAll('input:not([disabled]), select');
    
    // 商品状態とサイズの選択肢制御
    const conditionType = document.getElementById('conditionType');
    const itemConditions = document.getElementById('itemConditions');
    const sizeType = document.getElementById('sizeType');
    const itemSizes = document.getElementById('itemSizes');
    
    // 商品状態タイプが変更されたときの処理
    conditionType.addEventListener('change', function() {
        const selectedType = this.value;
        const generalConditions = document.querySelector('.general-conditions');
        const cardConditions = document.querySelector('.card-conditions');
        
        if (selectedType === 'general') {
            generalConditions.style.display = 'block';
            cardConditions.style.display = 'none';
        } else if (selectedType === 'trading_card') {
            generalConditions.style.display = 'none';
            cardConditions.style.display = 'block';
        }
        updateUrl();
    });
    
    // サイズタイプが変更されたときの処理
    sizeType.addEventListener('change', function() {
        const selectedType = this.value;
        const footwearSizes = document.querySelector('.footwear-sizes');
        const apparelSizes = document.querySelector('.apparel-sizes');
        const quantitySizes = document.querySelector('.quantity-sizes');
        
        // すべて非表示にする
        footwearSizes.style.display = 'none';
        apparelSizes.style.display = 'none';
        quantitySizes.style.display = 'none';
        
        // 選択されたタイプだけ表示する
        if (selectedType === 'footwear') {
            footwearSizes.style.display = 'block';
        } else if (selectedType === 'wear') {
            apparelSizes.style.display = 'block';
        } else if (selectedType === 'quantity') {
            quantitySizes.style.display = 'block';
        }
        updateUrl();
    });
    
    // 初期表示設定
    window.addEventListener('load', function() {
        conditionType.dispatchEvent(new Event('change'));
        sizeType.dispatchEvent(new Event('change'));
    });
    
    // 入力が変更されたらURLを更新
    inputs.forEach(input => {
        input.addEventListener('change', updateUrl);
        input.addEventListener('input', updateUrl);
    });
    
    // URLをコピーするボタン
    copyButton.addEventListener('click', function() {
        const textArea = document.createElement('textarea');
        textArea.value = generatedUrl.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        copyButton.textContent = 'コピーしました！';
        setTimeout(() => {
            copyButton.textContent = 'URLをコピー';
        }, 2000);
    });
    
    // URLをクリアするボタン
    clearButton.addEventListener('click', function() {
        // すべての入力フィールドをクリア
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else if (input.tagName === 'SELECT' && input.multiple) {
                Array.from(input.options).forEach(option => {
                    option.selected = false;
                });
            } else {
                input.value = '';
            }
        });
        
        // 初期表示設定を再適用
        conditionType.value = 'general';
        sizeType.value = 'footwear';
        conditionType.dispatchEvent(new Event('change'));
        sizeType.dispatchEvent(new Event('change'));
        
        // URLをデフォルトにリセット
        generatedUrl.textContent = 'https://snkrdunk.com/search/article/?';
    });
    
    // 複数選択されたオプションを取得する関数
    function getSelectedValues(selectElement) {
        const selectedOptions = Array.from(selectElement.selectedOptions);
        return selectedOptions.map(option => option.value);
    }
    
    // URLの更新処理
    function updateUrl() {
        let url = 'https://snkrdunk.com/search/article/?';
        const params = new URLSearchParams();
        
        // 基本設定
        const brandIds = document.getElementById('brandIds').value;
        const keywords = document.getElementById('keywords').value;
        const slide = document.getElementById('slide').value;
        
        // フィルター設定
        const isFirstHand = document.getElementById('isFirstHand').checked;
        const isSaleOnly = document.getElementById('isSaleOnly').checked;
        const isUnderRetail = document.getElementById('isUnderRetail').checked;
        
        // カテゴリ設定
        const searchCategoryIds = document.getElementById('searchCategoryIds').value;
        
        // 価格設定
        const minPrice = document.getElementById('minPrice').value;
        const maxPrice = document.getElementById('maxPrice').value;
        
        // その他の設定
        const sort = document.getElementById('sort').value;
        const itemConditionsValues = getSelectedValues(document.getElementById('itemConditions'));
        const itemSizesValues = getSelectedValues(document.getElementById('itemSizes'));
        
        // パラメータの設定
        if (brandIds) params.append('brandId', brandIds);
        if (keywords) params.append('keywords', encodeURIComponent(keywords));
        if (slide) params.append('slide', slide);
        
        if (isFirstHand) params.append('isFirstHand', 'true');
        if (isSaleOnly) params.append('isSaleOnly', 'true');
        if (isUnderRetail) params.append('isUnderRetail', 'true');
        
        if (searchCategoryIds) params.append('searchCategoryIds', searchCategoryIds);
        
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        
        if (sort) params.append('sort', sort);
        
        // 商品状態（複数選択可能）
        if (itemConditionsValues.length > 0) {
            params.append('itemConditions', itemConditionsValues.join(','));
        }
        
        // サイズ（複数選択可能）
        if (itemSizesValues.length > 0) {
            params.append('itemSizes', itemSizesValues.join(','));
        }
        
        // URLパラメータ文字列の生成
        const paramString = params.toString();
        if (paramString) {
            url += paramString;
        }
        
        // 生成されたURLを表示
        generatedUrl.textContent = url;
    }
});
