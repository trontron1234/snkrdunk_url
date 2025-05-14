document.addEventListener('DOMContentLoaded', function() {
    // DOM要素の取得
    const generatedUrl = document.getElementById('generatedUrl');
    const copyButton = document.getElementById('copyButton');
    const clearButton = document.getElementById('clearButton');
    const inputs = document.querySelectorAll('input, select');
    
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
            } else {
                input.value = '';
            }
        });
        
        // URLをデフォルトにリセット
        generatedUrl.textContent = 'https://snkrdunk.com/search/article/?';
    });
    
    // URLの更新処理
    function updateUrl() {
        let url = 'https://snkrdunk.com/search/article/?';
        const params = new URLSearchParams();
        
        // 基本設定
        const brandIds = document.getElementById('brandIds').value;
        const keywords = document.getElementById('keywords').value;
        const modelId = document.getElementById('modelId').value;
        const type = document.getElementById('type').value;
        const slide = document.getElementById('slide').value;
        
        // フィルター設定
        const isFirstHand = document.getElementById('isFirstHand').checked;
        const isSaleOnly = document.getElementById('isSaleOnly').checked;
        const isUnderRetail = document.getElementById('isUnderRetail').checked;
        const isDiscount = document.getElementById('isDiscount').checked;
        const isDiscountFirst = document.getElementById('isDiscountFirst').checked;
        
        // カテゴリ設定
        const rootCategoryId = document.getElementById('rootCategoryId').value;
        const categoryId = document.getElementById('categoryId').value;
        const subCategoryId = document.getElementById('subCategoryId').value;
        
        // 価格設定
        const minPrice = document.getElementById('minPrice').value;
        const maxPrice = document.getElementById('maxPrice').value;
        
        // その他の設定
        const sort = document.getElementById('sort').value;
        const itemConditions = document.getElementById('itemConditions').value;
        const itemSizes = document.getElementById('itemSizes').value;
        
        // パラメータの設定
        if (brandIds) params.append('brandId', brandIds);
        if (keywords) params.append('keywords', encodeURIComponent(keywords));
        if (modelId) params.append('modelId', modelId);
        if (type) params.append('type', type);
        if (slide) params.append('slide', slide);
        
        if (isFirstHand) params.append('isFirstHand', 'true');
        if (isSaleOnly) params.append('isSaleOnly', 'true');
        if (isUnderRetail) params.append('isUnderRetail', 'true');
        if (isDiscount) params.append('isDiscount', 'true');
        if (isDiscountFirst) params.append('isDiscountFirst', 'true');
        
        if (rootCategoryId) params.append('rootCategoryId', rootCategoryId);
        if (categoryId) params.append('categoryId', categoryId);
        if (subCategoryId) params.append('subCategoryId', subCategoryId);
        
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        
        if (sort) params.append('sort', sort);
        if (itemConditions) params.append('itemConditions', itemConditions);
        if (itemSizes) params.append('itemSizes', itemSizes);
        
        // URLパラメータ文字列の生成
        const paramString = params.toString();
        if (paramString) {
            url += paramString;
        }
        
        // 生成されたURLを表示
        generatedUrl.textContent = url;
    }
});
