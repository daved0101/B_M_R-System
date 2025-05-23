document.addEventListener('DOMContentLoaded', () => {
    // Signature Canvas Setup
    const canvases = document.querySelectorAll('canvas');
    const signatureData = {};

    canvases.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        let isDrawing = false;

        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        });

        canvas.addEventListener('mousemove', (e) => {
            if (isDrawing) {
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            }
        });

        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
            signatureData[canvas.id] = canvas.toDataURL();
        });

        canvas.addEventListener('mouseout', () => {
            isDrawing = false;
        });
    });

    // Button Event Listeners
    document.querySelectorAll('.drawBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            const canvas = document.getElementById(`signatureCanvas${section}`);
            canvas.style.backgroundColor = '#fff';
        });
    });

    document.querySelectorAll('.uploadTriggerBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector(`.uploadBtn[data-section="${btn.dataset.section}"]`).click();
        });
    });

    document.querySelectorAll('.uploadBtn').forEach(input => {
        input.addEventListener('change', (e) => {
            const section = input.dataset.section;
            const canvas = document.getElementById(`signatureCanvas${section}`);
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        const ctx = canvas.getContext('2d');
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        signatureData[canvas.id] = canvas.toDataURL();
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    });

    document.querySelectorAll('.clearBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            const canvas = document.getElementById(`signatureCanvas${section}`);
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            delete signatureData[canvas.id];
        });
    });

    document.querySelectorAll('.removeBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            const canvas = document.getElementById(`signatureCanvas${section}`);
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            delete signatureData[canvas.id];
        });
    });

    // Add Row Functions
    document.getElementById('addDocument').addEventListener('click', () => {
        const tbody = document.getElementById('refDocsTable');
        const row = tbody.insertRow();
        row.innerHTML = `
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><button class="removeRow bg-red-500 text-white px-2 py-1 rounded">Remove</button></td>
        `;
        row.querySelector('.removeRow').addEventListener('click', () => row.remove());
    });

    document.getElementById('addRawMaterial').addEventListener('click', () => {
        const tbody = document.getElementById('rawMaterialsTable');
        const row = tbody.insertRow();
        row.innerHTML = `
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><button class="removeRow bg-red-500 text-white px-2 py-1 rounded">Remove</button></td>
        `;
        row.querySelector('.removeRow').addEventListener('click', () => row.remove());
    });

    document.getElementById('addEquipment').addEventListener('click', () => {
        const tbody = document.getElementById('equipmentTable');
        const row = tbody.insertRow();
        row.innerHTML = `
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><button class="removeRow bg-red-500 text-white px-2 py-1 rounded">Remove</button></td>
        `;
        row.querySelector('.removeRow').addEventListener('click', () => row.remove());
    });

    document.getElementById('addAreaStep').addEventListener('click', () => {
        const tbody = document.getElementById('areaClearanceTable');
        const row = tbody.insertRow();
        row.innerHTML = `
            <td class="border p-2">${tbody.rows.length + 1}</td>
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><button class="removeRow bg-red-500 text-white px-2 py-1 rounded">Remove</button></td>
        `;
        row.querySelector('.removeRow').addEventListener('click', () => {
            row.remove();
            // Update S/No
            Array.from(tbody.rows).forEach((r, i) => r.cells[0].textContent = i + 1);
        });
    });

    document.getElementById('addProcedureStep').addEventListener('click', () => {
        const tbody = document.getElementById('procedureTable');
        const row = tbody.insertRow();
        row.innerHTML = `
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><input type="text" class="w-full border p-1"></td>
            <td class="border p-2"><button class="removeRow bg-red-500 text-white px-2 py-1 rounded">Remove</button></td>
        `;
        row.querySelector('.removeRow').addEventListener('click', () => row.remove());
    });

    // Save Functions
    document.getElementById('saveProductDetails').addEventListener('click', () => {
        const data = {
            productName: document.getElementById('productName').value,
            colour: document.getElementById('colour').value,
            shape: document.getElementById('shape').value,
            batchSize: document.getElementById('batchSize').value,
            quantity: document.getElementById('quantity').value,
            packages: document.getElementById('packages').value,
            storage: document.getElementById('storage').value
        };
        localStorage.setItem('productDetails', JSON.stringify(data));
        alert('Product Details Saved');
    });

    document.getElementById('saveRefDocs').addEventListener('click', () => {
        const rows = Array.from(document.getElementById('refDocsTable').rows).map(row => row.cells[0].querySelector('input').value);
        const data = {
            documents: rows,
            preparedBy: document.getElementById('preparedBy').value,
            signature: signatureData['signatureCanvas2'],
            date: document.getElementById('date2').value
        };
        localStorage.setItem('refDocs', JSON.stringify(data));
        alert('Reference Documents Saved');
    });

    document.getElementById('saveRawMaterials').addEventListener('click', () => {
        const rows = Array.from(document.getElementById('rawMaterialsTable').rows).map(row => ({
            description: row.cells[0].querySelector('input').value,
            itemNumber: row.cells[1].querySelector('input').value,
            quantityRequired: row.cells[2].querySelector('input').value,
            lotNumber: row.cells[3].querySelector('input').value,
            qtyStaged: row.cells[4].querySelector('input').value,
            performedBy: row.cells[5].querySelector('input').value,
            checkedBy: row.cells[6].querySelector('input').value,
            verifiedBy: row.cells[7].querySelector('input').value
        }));
        localStorage.setItem('rawMaterials', JSON.stringify(rows));
        alert('Raw Materials Saved');
    });

    document.getElementById('saveEquipment').addEventListener('click', () => {
        const rows = Array.from(document.getElementById('equipmentTable').rows).map(row => ({
            description: row.cells[0].querySelector('input').value,
            idNo: row.cells[1].querySelector('input').value,
            prevCalibration: row.cells[2].querySelector('input').value,
            calibrationRequired: row.cells[3].querySelector('input').value,
            performedBy: row.cells[4].querySelector('input').value,
            verifiedBy: row.cells[5].querySelector('input').value
        }));
        localStorage.setItem('equipment', JSON.stringify(rows));
        alert('Equipment Saved');
    });

    document.getElementById('saveAreaClearance').addEventListener('click', () => {
        const rows = Array.from(document.getElementById('areaClearanceTable').rows).map(row => ({
            step: row.cells[1].querySelector('input').value,
            performedBy: row.cells[2].querySelector('input').value,
            verifiedBy: row.cells[3].querySelector('input').value
        }));
        const data = {
            steps: rows,
            preparedByQA: document.getElementById('preparedByQA').value,
            signatureQA: signatureData['signatureCanvas5QA'],
            dateQA: document.getElementById('date5QA').value,
            verifiedByRQAS: document.getElementById('verifiedByRQAS').value,
            signatureRQAS: signatureData['signatureCanvas5RQAS'],
            dateRQAS: document.getElementById('date5RQAS').value
        };
        localStorage.setItem('areaClearance', JSON.stringify(data));
        alert('Area Clearance Saved');
    });

    document.getElementById('saveProcedure').addEventListener('click', () => {
        const rows = Array.from(document.getElementById('procedureTable').rows).map(row => ({
            step: row.cells[0].querySelector('input').value,
            performedBy: row.cells[1].querySelector('input').value,
            verifiedBy: row.cells[2].querySelector('input').value
        }));
        localStorage.setItem('procedure', JSON.stringify(rows));
        alert('Procedure Saved');
    });

    document.getElementById('saveSampling').addEventListener('click', () => {
        const rows = Array.from(document.getElementById('samplingTable').rows).map(row => ({
            description: row.cells[0].textContent,
            performedBy: row.cells[1].querySelector('input').value,
            verifiedBy: row.cells[2].querySelector('input').value
        }));
        localStorage.setItem('sampling', JSON.stringify(rows));
        alert('Sampling, Material Transfer, and Storage Saved');
    });

    document.getElementById('saveBatchIssuance').addEventListener('click', () => {
        const data = {
            issuedByProduction: document.getElementById('issuedByProduction').value,
            signatureProduction: signatureData['signatureCanvas8Production'],
            dateProduction: document.getElementById('date8Production').value,
            issuedToRQAS: document.getElementById('issuedToRQAS').value,
            signatureRQAS: signatureData['signatureCanvas8RQAS'],
            dateRQAS: document.getElementById('date8RQAS').value
        };
        localStorage.setItem('batchIssuance', JSON.stringify(data));
        alert('Batch Issuance Saved');
    });

    document.getElementById('savePostProduction').addEventListener('click', () => {
        const rows = Array.from(document.querySelectorAll('#postProductionTable tbody tr')).map(row => ({
            department: row.cells[0].textContent,
            name: row.cells[1].querySelector('input').value,
            signature: signatureData[row.cells[2].querySelector('canvas').id],
            date: row.cells[3].querySelector('input').value
        }));
        localStorage.setItem('postProduction', JSON.stringify(rows));
        alert('Post Production Review Saved');
    });

    document.getElementById('saveProductRelease').addEventListener('click', () => {
        const rows = Array.from(document.querySelectorAll('#productReleaseTable tbody tr')).map(row => ({
            role: row.cells[0].textContent,
            name: row.cells[1].querySelector('input').value,
            signature: signatureData[row.cells[2].querySelector('canvas').id],
            date: row.cells[3].querySelector('input').value
        }));
        const data = {
            lotNo: document.getElementById('lotNo').value,
            mfgDate: document.getElementById('mfgDate').value,
            expDate: document.getElementById('expDate').value,
            roles: rows
        };
        localStorage.setItem('productRelease', JSON.stringify(data));
        alert('Product Release Saved');
    });

    // Export Functions
    document.getElementById('exportBtn').addEventListener('click', () => {
        const data = {
            productDetails: JSON.parse(localStorage.getItem('productDetails') || '{}'),
            refDocs: JSON.parse(localStorage.getItem('refDocs') || '{}'),
            rawMaterials: JSON.parse(localStorage.getItem('rawMaterials') || '[]'),
            equipment: JSON.parse(localStorage.getItem('equipment') || '[]'),
            areaClearance: JSON.parse(localStorage.getItem('areaClearance') || '{}'),
            procedure: JSON.parse(localStorage.getItem('procedure') || '[]'),
            sampling: JSON.parse(localStorage.getItem('sampling') || '[]'),
            batchIssuance: JSON.parse(localStorage.getItem('batchIssuance') || '{}'),
            postProduction: JSON.parse(localStorage.getItem('postProduction') || '[]'),
            productRelease: JSON.parse(localStorage.getItem('productRelease') || '{}')
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'batch_record.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    document.getElementById('exportPDFBtn').addEventListener('click', () => {
        alert('PDF export functionality requires a library like jsPDF. Please include jsPDF for full functionality.');
    });
});