document.addEventListener('DOMContentLoaded', function() {
    // タブ切り替え
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // URLを生成
    const generateBtn = document.getElementById('generate-btn');
    const generatedUrlInput = document.getElementById('generated-url');
    
    generateBtn.addEventListener('click', () => {
        const baseUrl = 'https://snkrdunk.com/search/article/?';
        const params = new URLSearchParams();
        
        // 基本設定
        const keywords = document.getElementById('keywords').value;
        const brandId = document.getElementById('brandId').value;
        const isSaleOnly = document.getElementById('isSaleOnly').checked;
        const isFirstHand = document.getElementById('isFirstHand').checked;
        
        if (keywords) params.append('keywords', keywords);
        if (brandId) params.append('brandId', brandId);
        if (isSaleOnly) params.append('isSaleOnly', 'true');
        if (isFirstHand) params.append('isFirstHand', 'true');
        
        // カテゴリ設定
        const rootCategoryId = document.getElementById('rootCategoryId').value;
        const categoryId = document.getElementById('categoryId').value;
        const subCategoryId = document.getElementById('subCategoryId').value;
        const searchCategoryIds = document.getElementById('searchCategoryIds').value;
        
        if (rootCategoryId) params.append('rootCategoryId', rootCategoryId);
        if (categoryId) params.append('categoryId', categoryId);
        if (subCategoryId) params.append('subCategoryId', subCategoryId);
        if (searchCategoryIds) params.append('searchCategoryIds', searchCategoryIds);
        
        // フィルター設定
        const isUnderRetail = document.getElementById('isUnderRetail').checked;
        const isDiscount = document.getElementById('isDiscount').checked;
        const isDiscounted = document.getElementById('isDiscounted').checked;
        const isDiscountFirst = document.getElementById('isDiscountFirst').checked;
        const itemConditions = document.getElementById('itemConditions').value;
        const itemSizes = document.getElementById('itemSizes').value;
        const minPrice = document.getElementById('minPrice').value;
        const maxPrice = document.getElementById('maxPrice').value;
        
        if (isUnderRetail) params.append('isUnderRetail', 'true');
        if (isDiscount) params.append('isDiscount', 'true');
        if (isDiscounted) params.append('isDiscounted', 'true');
        if (isDiscountFirst) params.append('isDiscountFirst', 'true');
        if (itemConditions) params.append('itemConditions', itemConditions);
        if (itemSizes) params.append('itemSizes', itemSizes);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        
        // ソート設定
        const sortType = document.getElementById('sort-type').value;
        const tabType = document.getElementById('tab-type').value;
        
        if (sortType) params.append('sort', sortType);
        if (tabType) params.append('tab', tabType);
        
        // 追加パラメータ
        params.append('slide', 'right'); // デフォルトで右スライド
        
        // 生成されたURLを表示
        generatedUrlInput.value = baseUrl + params.toString();
    });
    
    // URLをコピー
    const copyBtn = document.getElementById('copy-btn');
    
    copyBtn.addEventListener('click', () => {
        generatedUrlInput.select();
        document.execCommand('copy');
        alert('URLをコピーしました');
    });
    
    // 既存URLの解析
    const parseBtn = document.getElementById('parse-btn');
    const existingUrlInput = document.getElementById('existing-url');
    
    parseBtn.addEventListener('click', () => {
        try {
            const url = new URL(existingUrlInput.value);
            const params = new URLSearchParams(url.search);
            
            // フォームに値をセット
            document.getElementById('keywords').value = params.get('keywords') || '';
            document.getElementById('brandId').value = params.get('brandId') || '';
            document.getElementById('isSaleOnly').checked = params.get('isSaleOnly') === 'true';
            document.getElementById('isFirstHand').checked = params.get('isFirstHand') === 'true';
            
            document.getElementById('rootCategoryId').value = params.get('rootCategoryId') || '';
            document.getElementById('categoryId').value = params.get('categoryId') || '';
            document.getElementById('subCategoryId').value = params.get('subCategoryId') || '';
            document.getElementById('searchCategoryIds').value = params.get('searchCategoryIds') || '';
            
            document.getElementById('isUnderRetail').checked = params.get('isUnderRetail') === 'true';
            document.getElementById('isDiscount').checked = params.get('isDiscount') === 'true';
            document.getElementById('isDiscounted').checked = params.get('isDiscounted') === 'true';
            document.getElementById('isDiscountFirst').checked = params.get('isDiscountFirst') === 'true';
            document.getElementById('itemConditions').value = params.get('itemConditions') || '';
            document.getElementById('itemSizes').value = params.get('itemSizes') || '';
            document.getElementById('minPrice').value = params.get('minPrice') || '';
            document.getElementById('maxPrice').value = params.get('maxPrice') || '';
            
            document.getElementById('sort-type').value = params.get('sort') || '';
            document.getElementById('tab-type').value = params.get('tab') || '';
            
        } catch (e) {
            alert('有効なURLを入力してください');
        }
    });
});
