(function () {
    return {
        title: '',
        hint: '',
        formatTitle: function () {
            return ''
        },
        customConfig: `
                   
                 <div class="main-group"> 
                    <div id="items-container" class="topBlocks">                         
                          <button name="button" id="createTicket">Тык!</button>
                    </div>  

                    <div class="input-group">
                        <select id="CertificateAuthority">                                    
                        </select>
                    </div>  

                    
                    <form id="formElem">                       
                        Файл ключа: <input  id="keyContainerUpload" name="key" type="file" accept=".dat, .pfx, .jks, .p12, .zs2" >
                        <input type="submit">
                    </form>

                    <label id="containerPasswordLabel" for="containerPassword">Пароль: </label><input type="password" id="containerPassword" name="Password" value="">

                    <textarea id="textData_ResultCertificate" name="textData_ResultCertificate" rows="4" cols="50" style="width: 100%;"></textarea>
                
                </div> 



                <div class="input-group">Створити ЕП
                 
                    <form id="formElem_CreateEP">                       
                        File: <input  id="keyContainerUpload_CreateEP" name="key" type="file" >
                        <input type="submit">
                    </form>

                    <button name="button" id="createEP_File">Создать ЕП</button>

                    <button name="button" id="previewStatusEP_File">Получение результата создания ЭП</button>
                    <button name="button" id="previewEP_File">Получение подписанных данных (application/octet-stream)</button>
                    <button name="button" id="previewEP_FileBase64">Получение подписанных данных Base64 (application/json)</button>

                    <p></p>
                    <label for="textData">Тестовые данные:</label>
                    
                    <button name="button" id="convertTextBase64">convertText - ds/data</button>
                    
                    <button name="button" id="generateHash">generateHash</button>
                    <p></p>
                    <button id="getStatus">getStatus</button>
                    <button id="getDSData">getDSData</button>
                    <button id="getBlobData">getBlobData</button>
                </div>  


                


                <div class="main-group"> 
                    <textarea id="textData" name="textData" rows="4" cols="50">test123</textarea>
                    <button name="button" id="createEP_Text">Создать ЕП - TEXT</button>
                    <textarea id="textData_result" name="textData_result" rows="4" cols="50"></textarea>
                </div>  


                <div class="main-group"> 
                    <textarea id="textData_Verif_origin" name="textData_Verif_origin" rows="4" cols="50"></textarea>
                    <textarea id="textData_Verif_base64" name="textData_Verif_base64" rows="4" cols="50"></textarea>
                    <button name="button" id="verifEP_Text">Верификация ЕП - TEXT</button>
                </div>  
                    
             `,

        json_beautify: function (json_val) {
            // The plugin
             $.fn.json_beautify= function() {
                var obj = JSON.parse( json_val );
                var pretty = JSON.stringify(obj, undefined, 4);
                this.val(pretty);
             };
             
             // Then use it like this on any textarea
             $('#textData_ResultCertificate').json_beautify();
        }, 
        eventListeners: [],
        subs: [],
        loadScript: function (src) {
            return new Promise(function (resolve, reject) {
                let script = document.createElement('script');
                script.src = src;

                script.onload = () => resolve(script);
                script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));

                document.head.append(script);
            });
        },
        loadStyles: function (href) {
            return new Promise(function (resolve, reject) {
                let script = document.createElement('link');
                script.href = href;
                script.rel = 'stylesheet';

                script.onload = () => resolve(script);
                script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));

                document.head.append(script);
            });
        },
        ticket_uuid: null,
        settedOptions: null,
        messageContainerUpload: null,
        ticketOption: function () {
            let that = this;
            // var selectedOptions = {
            //     embedCertificateType: "nothing",
            // };
            var selectedOptions = {caId: this.selectedCertificateAuthority};
            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/option`,
                type: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(selectedOptions)
            }).done(function (jsonResponse, textStatus, xhr) {;
                message = jsonResponse.message;
                settedOptions = jsonResponse.settedOptions;
                that.settedOptions = settedOptions;
                console.log(that.settedOptions);

                // //3. Получение списка поддерживаемых КПЭДУ/(А)ЦСК
                // that.loadCertificateAuthority();

            }).fail(function (xhr) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при установке настроек сессии." : xhr.responseText;
                }
            })
        },
        certInfo: null,
        getSertificate: function () {
            //Получение данных сертификата
            let that = this;
            let containerPassword = document.getElementById('containerPassword').value
            
            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/keyStore/certificate/info/signature`,
                type: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({keyStorePassword : containerPassword}),
                cache: false
            }).done(function (jsonResponse, textStatus, xhr) {
                certInfo = jsonResponse;
                that.certInfo = certInfo;
                console.log(jsonResponse);
                that.endLoad();
            }).fail(function (xhr) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                    console.log(message);
                    failureCause = jsonResponse.failureCause;
                    console.log(jsonResponse);
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при получении данных сертификата." : xhr.responseText;
                    console.log(message);
                }
            })
        },
        createEP_File: function () {
            //Создание ЭП - FILE
            //Инициирует процесс асинхронного создания ЭП для ранее загруженных данных и ключевого контейнера сессии.
            let that = this;

            let containerPassword = document.getElementById('containerPassword').value
            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/ds/creator`,
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({keyStorePassword : containerPassword})
            }).done(function (jsonResponse, textStatus, xhr) {
                message = jsonResponse.message;
            }).fail(function (xhr) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                    failureCause = jsonResponse.failureCause;
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при создании ЭП." : xhr.responseText;
                }
            })
        },
        previewStatusEP_File: function () {
            //Получение результата создания ЭП - FILE
            //Запрос служит для контроля состояния процесса асинхронного создания ЭП. Если процесс находится в стадии выполнения будет возвращен HTTP статус код 202, в случае успешного завершения - 200. В остальных случаях возвращаются соответствующие коды из серий 4хх и 5хх..
            let that = this;

            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/ds/creator`,
                type: "GET",
                dataType: "json",
                cache: false
            }).done(function (jsonResponse, textStatus, xhr) {
                message = jsonResponse.message;
                debugger
            }).fail(function (xhr) {
                try {
                    debugger
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                    failureCause = jsonResponse.failureCause;
                } catch (e) {
                    debugger
                    message = (xhr.responseText == undefined) ? "Ошибка при получении результата создания ЭП." : xhr.responseText;
                }
            })
        },
        previewEP_File: function () {
            //Получение подписанных данных (application/octet-stream)
            //Запрос для получения подписанных данных двоичном формате.
            let that = this;


            // function saveBlob(blob, fileName) {
            //     var a = document.createElement('a');
            //     a.href = window.URL.createObjectURL(blob);
            //     a.download = fileName;
            //     a.dispatchEvent(new MouseEvent('click'));
            // }

            // function saveOrOpenBlob(blob, fileName) {
            //     window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
            //     window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function (fs) {
            //         fs.root.getFile(fileName, { create: true }, function (fileEntry) {
            //             fileEntry.createWriter(function (fileWriter) {
            //                 fileWriter.addEventListener("writeend", function () {
            //                     window.location = fileEntry.toURL();
            //                 }, false);
            //                 fileWriter.write(blob, "_blank");
            //             }, function () { });
            //         }, function () { });
            //     }, function () { });
            // }


            var xhr = new XMLHttpRequest();
            var requestUrl = `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/ds/signedData`;
            xhr.open("GET", requestUrl);
            xhr.responseType = "blob";
            var setBlobData = function(data) {
                // return this.setState({blobData:data});
                // localThis.setState({blobData:data});
                debugger
                that.state.blobData = data;     
                debugger     
            }

            xhr.onload = function(e) {
                if (xhr.status == 200) {
                    debugger
                    var dsData = xhr.response;
                    message = "Подписанные данные успешно получены.";
                    console.log(message);
                    console.log(dsData);
                   
                    setBlobData(dsData);

                    // var blob = e.currentTarget.response;
                    // var contentDispo = e.currentTarget.getResponseHeader('Content-Disposition');
                    // // https://stackoverflow.com/a/23054920/
                    // var fileName = contentDispo.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1];
                    // saveOrOpenBlob(blob, fileName);
                    // saveBlob(blob, fileName);

                } else {
                    var reader = new FileReader();
                    reader.onload = function() {
                        var response = reader.result;
                        try {
                            var jsonResponse = JSON.parse(xhr.responseText);
                            message = jsonResponse.message;
                        } catch (e) {
                            message = (xhr.responseText == undefined) ? "Ошибка при получении подписанных данных." : xhr.responseText;
                        }
                    }
                    reader.readAsText(xhr.response);
                }
            };
            xhr.send();
        },
        previewEP_FileBase64: function () {
            //Получение подписанных данных Base64
            //Запрос для получения подписанных формате Base64
            let that = this;

            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/ds/base64SignedData`,
                type: "GET",
                dataType: "json",
                cache: false
            }).done(function (jsonResponse, textStatus, xhr) {
                debugger
                dsData = jsonResponse.base64Data;
                message = "Подписанные данные успешно получены.";
                that.base64DsData = dsData;
            }).fail(function (xhr) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при получении подписанных данных." : xhr.responseText;
                }
            })

        },
        createSessionMain_verifEP_Text: function (){
            let that = this;

            return fetch(this.state.baseUrl, {
                method: 'POST',
                dataType: "json"
              },).then(response => {
              if (response.ok) {
                response.json().then(json => {
                  that.ticket_uuid = json.ticketUuid;
                  that.verifEP_Text();
                  console.log(json.message);
                });
              }
            });
        },
        deleteSessionMain: function() {
            let that = this;

            let url = this.state.baseUrl + this.ticket_uuid;
            return fetch(url, {
                method: "DELETE",
                dataType: "json",
                cache: "no-cache",
                }).then((response) => {
                response.json().then((response) => {
                    console.log(response);
                });
            });
        },

        verifEP_Text: function () {
            //Верификация 
            let that = this;
            let textToSend = btoa(document.getElementById('textData_Verif_origin').value)

            
            var data = {
                base64Data: textToSend
            }
            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/data`,
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data)
            }).done(function (jsonResponse, textStatus, xhr) {
                message = jsonResponse.message;
                console.log(message);
                that.createDSData_verif();
            }).fail(function (xhr) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                    failureCause = jsonResponse.failureCause;
                    console.log(message);
                    console.log(jsonResponse);
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при загрузке данных сессии." : xhr.responseText;
                    console.log(message);
                }
            })

        },
        createDSData_verif: function () {
            //Загрузка данных ЭП (application/json)
            let that = this;

            let textToSend = document.getElementById('textData_Verif_base64').value
            // that.base64DsData

            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/ds/data`,
                type: "POST",
                // dataType: "json",
                contentType: "application/octet-stream",
                data: textToSend
            }).done(function (jsonResponse, textStatus, xhr) {
                message = jsonResponse.message;
                console.log(message);
                that.verifEP_Text_updateOptions();
            }).fail(function (xhr) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                    failureCause = jsonResponse.failureCause;
                    console.log(message);
                    console.log(jsonResponse);
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при загрузке данных ЭП." : xhr.responseText;
                    console.log(message);
                }
            })
        },
        verifEP_Text_updateOptions: function () {
            //Установка метаданных сессии
            let that = this;
           
            var selectedOptions = {
                cadesType: "CAdESXLong",
                dataTsVerifyOption: "verifyIfPresent",
                expandDSType: true,
                expandDataVerifyTs: false,
                expandTSVerify: false,
                generateQR: false,
                showUpgradeCard: false,
                signatureTsVerifyOption: "verifyIfPresent",
                signatureType: "detached"
            };

            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/option`,
                type: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(selectedOptions)
            }).done(function (jsonResponse, textStatus, xhr) {
                message = jsonResponse.message;
                settedOptions = jsonResponse.settedOptions;
                console.log(message);
                console.log(jsonResponse);
                that.verifText();
            }).fail(function (xhr) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                    console.log(message);
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при установке настроек сессии." : xhr.responseText;
                    console.log(message);
                }
            })


        },

        verifText: function () {
            let that = this;

            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/ds/verifier`,
                type: "POST",
                dataType: "json",
                contentType: "text/plain"
            }).done(function (jsonResponse, textStatus, xhr) {
                message = jsonResponse.message;
                console.log(message);
                that.getStatusVerifText()
            }).fail(function (xhr) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                    console.log(message);
                    failureCause = jsonResponse.failureCause;
                    console.log(jsonResponse);
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при проверке ЭП." : xhr.responseText;
                    console.log(message);
                }
            })
        },
        getStatusVerifText: function () {
            let that = this;
            
            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/ds/verifier`,
                type: "GET",
                dataType: "json",
                cache: false
            }).done(function (jsonResponse, textStatus, xhr) {
                message = jsonResponse.message;
                verifyResults = jsonResponse.verifyResults;
                console.log(message);
                console.log(jsonResponse);
                that.deleteSessionMain();
            }).fail(function (xhr) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                    failureCause = jsonResponse.failureCause;
                    verifyResults = jsonResponse.verifyResults;
                    console.log(message);
                    console.log(jsonResponse);
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при получении результата проверки ЭП." : xhr.responseText;
                    console.log(message);
                }
            })
        },
        createSessionMain_createEP_Text: function (){
            let that = this;

            return fetch(this.state.baseUrl, {
                method: 'POST',
                dataType: "json"
              },).then(response => {
              if (response.ok) {
                response.json().then(json => {
                  that.ticket_uuid = json.ticketUuid;
                  that.createEP_Text();
                  console.log(json.message);
                });
              }
            });
        },
        createEP_Text: function () {
            //Получение подписанных данных TEXT
            //Запрос для получения подписанных формате Base64
            let that = this;
            let textToSend = btoa(document.getElementById('textData').value)
            
            var data = {
                base64Data: textToSend
            }
            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/data`,
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data)
            }).done(function (jsonResponse, textStatus, xhr) {
                message = jsonResponse.message;
                console.log(message);
                that.createEP_Text_createMetadata();
            }).fail(function (xhr) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                    console.log(message);
                    failureCause = jsonResponse.failureCause;
                    console.log(jsonResponse);
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при загрузке данных сессии." : xhr.responseText;
                    console.log(message);
                }
            })

        },
        createEP_Text_createMetadata: function () {
            //Установка метаданных сессии
            let that = this;

            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/metadata`,
                type: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({metaData: ""})
            }).done(function (jsonResponse, textStatus, xhr) {
                message = jsonResponse.message;
                console.log(message);
                that.createEP_Text_updateOptions()
            }).fail(function (xhr) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                    console.log(message);
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при установке метаданных." : xhr.responseText;
                    console.log(message);
                }
            })
        },
        
        createEP_Text_updateOptions: function () {
            //Установка метаданных сессии
            let that = this;
           
            var selectedOptions = {
                caId: "testCipherCa",
                cadesType: "CAdESBES",
                cleanUpForm: false,
                dataToSignQualifier: "notSignedBefore",
                dataTsVerifyOption: "ignore",
                duplicateSign: false,
                embedCertificateType: "signerAndCaCert",
                embedDataTs: "true",
                embedDataTsChecked: true,
                embedSignatureTs: "true",
                embedSignatureTsChecked: true,
                expandCreateDSCadesType: false,
                expandCreateDSTSVerify: false,
                expandCreateDSType: true,
                generateQR: false,
                showUpgradeCard: false,
                signatureTsVerifyOption: "ignore",
                signatureType: "detached",
                tsAdditionalVerifying: false
            };
            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/option`,
                type: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(selectedOptions)
            }).done(function (jsonResponse, textStatus, xhr) {
                message = jsonResponse.message;
                settedOptions = jsonResponse.settedOptions;
                console.log(message);
                that.createEP_Text_updateKeyStore();
            }).fail(function (xhr) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                    console.log(message);
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при установке настроек сессии." : xhr.responseText;
                    console.log(message);
                }
            })


        },
        createEP_Text_updateKeyStore: function () {
            //Загрузка ключевого контейнера сессии (application/octet-stream)
            let that = this;          
          
            let rawData = this.keyStore;

            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/keyStore`,
                type: "PUT",
                contentType: "application/octet-stream",
                processData: false,
                data: rawData
            }).done(function (jsonResponse, textStatus, xhr) {
                message = jsonResponse.message;
                console.log(message);
                that.createEP_Text_ds_creator();
            }).fail(function (xhr) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                    failureCause = jsonResponse.failureCause;
                    console.log(message);
                    console.log(jsonResponse);
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при загрузке данных ключевого контейнера." : xhr.responseText;
                    console.log(message);
                }
            })
        },
        createEP_Text_ds_creator: function () {
            //Создание ЭП
            let that = this;
            // $.ajax({
            //     url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/ds/creator`,
            //     type: "POST",
            //     dataType: "json",
            //     contentType: "text/plain"
            // }).done(function (jsonResponse, textStatus, xhr) {
            //     debugger
            //     message = jsonResponse.message;
            //     // that.createEP_Text_ds_base64Data();
            // }).fail(function (xhr) {
            //     try {
            //         var jsonResponse = JSON.parse(xhr.responseText);
            //         message = jsonResponse.message;
            //         failureCause = jsonResponse.failureCause;
            //     } catch (e) {
            //         message = (xhr.responseText == undefined) ? "Ошибка при создании ЭП." : xhr.responseText;
            //     }
            // })

            let containerPassword = document.getElementById('containerPassword').value
            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/ds/creator`,
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({keyStorePassword : containerPassword}),
            }).done(function (jsonResponse, textStatus, xhr) {
                message = jsonResponse.message;
                console.log(message);
                that.convertTextBase64_View();
            }).fail(function (xhr) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                    failureCause = jsonResponse.failureCause;
                    console.log(message);
                    console.log(jsonResponse);
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при создании ЭП." : xhr.responseText;
                    console.log(message);
                }
            })


           
            

        },
        createEP_Text_ds_base64Data: function () {
            //Создание ЭП
            let that = this;
            debugger
          
            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/ds/base64Data`,
                type: "GET",
                dataType: "json",
                cache: false
            }).done(function (jsonResponse, textStatus, xhr) {
                debugger
                dsData = jsonResponse.base64Data;
                message = "Данные ЭП успешно получены.";
            }).fail(function (xhr) {
                try {
                    debugger
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при получении данных ЭП." : xhr.responseText;
                }
            })


        },

        generateHash: function () {
            //Создание ЭП
            let that = this;
            let textBase64 = '';
            debugger
            var settings = {
                "url": "https://ccs-dev-api.cipher.kiev.ua/ccs/hash/api/v1/function",
                "method": "POST",
                "timeout": 0,
                "headers": {
                  "Content-Type": "application/json"
                },
                "data": JSON.stringify({"hashAlgorithm":"GOST3411","base64Data":textBase64}),
              };
               
              $.ajax(settings).done(function (response) {
                console.log(response);
              });

        },

        base64DsData: null,
        convertTextBase64: function () {
            //Загрузка данных ЭП (application/json)
            let that = this;


            let textToSend = btoa(document.getElementById('textData').value)

            // that.base64DsData
            debugger
            var data = {
                base64Data: textToSend
            }
            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/ds/data`,
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data)
            }).done(function (jsonResponse, textStatus, xhr) {
                debugger
                message = jsonResponse.message;
            }).fail(function (xhr) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                    failureCause = jsonResponse.failureCause;
                    debugger
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при загрузке данных ЭП." : xhr.responseText;
                    debugger
                }
            })
        },
        dsDataOUT: null,
        convertTextBase64_View: function () {
            //Загрузка данных ЭП (application/json)
            let that = this;

            var xhr = new XMLHttpRequest();
            var requestUrl = `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/ds/data`;
            xhr.open("GET", requestUrl);
            xhr.responseType = "blob";
            xhr.onload = function() {
                if (xhr.status == 200) {
                    dsData = xhr.response;
                    that.dsDataOUT = dsData;
                    message = "Данные ЭП успешно получены.";
                    console.log(message);
                    var reader = new FileReader();
                    reader.readAsDataURL(dsData); 
                    reader.onloadend = function() {                       
                        var base64data = reader.result.substr(37); /*УБИРАЕМ ТЕКСТ "data:application/octet-stream;base64," - ОН НЕ НУЖЕН*/               
                        console.log(base64data);
                        document.getElementById('textData_result').value = base64data;
                        that.deleteSessionMain();
                    }
                } else {
                    var reader = new FileReader();
                    reader.onload = function() {
                        var response = reader.result;
                        try {
                            var jsonResponse = JSON.parse(xhr.responseText);
                            message = jsonResponse.message;
                            console.log(message);
                        } catch (e) {
                            message = (xhr.responseText == undefined) ? "Ошибка при получении данных ЭП." : xhr.responseText;
                            console.log(message);
                        }
                    }
                    reader.readAsText(xhr.response);
                }
            };
            xhr.send();
        },
        createTicket: function () {
            //Создание сессии
            let that = this;

            $.ajax({
                url: "https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket",
                type: "POST",
                dataType: "json"
            }).done(function (jsonResponse, textStatus, xhr) {
                message = jsonResponse.message;
                uuid = jsonResponse.ticketUuid;
                that.ticket_uuid = uuid;
                console.log(that.ticket_uuid);

                //2.Установка параметров сессии
                //Устанавливает параметры операции зашифрования, которые используются в контексте определенной сессии.
                // that.ticketOption();
                //3. Получение списка поддерживаемых КПЭДУ/(А)ЦСК
                that.loadCertificateAuthority();
                //kolya - ticketOption буду отправлять при отправки файла + добавил loadCertificateAuthority
                
            }).fail(function (xhr) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;                            
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при создании квитанции." : xhr.responseText;
                }
            })
        },
        certificateAuthority: null,
        selectedCertificateAuthority: null,
        generateCertificateAuthority: function () {
            let that = this;
            let select = document.querySelector('#CertificateAuthority')
            for (let i = 0; i < that.certificateAuthority.length; i++) {
                console.log(that.certificateAuthority[i].name)
                select.innerHTML += `<option value='${that.certificateAuthority[i].id}'>${that.certificateAuthority[i].name}</option>`
            }

            this.selectedCertificateAuthority = select.value;

            select.onchange = (e) => {
                    that.selectedCertificateAuthority = e.currentTarget.value;
                    $('#textData_ResultCertificate')[0].value = null;
                // let executeStat = {
                //     queryCode: 'PlanVersion_State_Update',
                //     limit: -1,
                //     parameterValues: [{
                //             key: '@PlanVersion_Id',
                //             value: versionId
                //         },
                //         {
                //             key: '@State_EKey',
                //             value: parseInt(select.options[select.selectedIndex].value)
                //         }
                //     ]
                // };
                // this.queryExecutor(executeStat, (data) => {
                //     this.topSelect()

                //     let mess = {
                //         name: 'updateTable',
                //         package: {
                //             value: 'update'
                //         }
                //     }

                //     this.messageService.publish(mess);
                // })
            }
        },    
        loadCertificateAuthority: function () {
            //Получение списка поддерживаемых КПЭДУ/(А)ЦСК
            let that = this;


            $.ajax({
                url: "https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/certificateAuthority/supported",
                type: "GET",
                dataType: "json",
                cache: false
            }).done(function (jsonResponse, textStatus, xhr) {
                ca = jsonResponse.ca;
                that.certificateAuthority = ca;
                console.log(that.certificateAuthority);

                that.generateCertificateAuthority();
            }).fail(function (xhr) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при получении списка поддерживаемых КПЭДУ/(А)ЦСК." : xhr.responseText;
                }
            })
            
        },
        scriptInstaller: function () {
            let that = this;
            this.loadStyles('https://code.jquery.com/ui/1.12.1/themes/flick/jquery-ui.css')
                .then(s => this.loadScript('https://code.jquery.com/jquery-3.6.0.js'))
                .then(s => this.loadScript('https://code.jquery.com/ui/1.12.1/jquery-ui.js'))
                .then(s => {
                    document.getElementById('createTicket').addEventListener('click', function(event) {
                        //1. Создание сессии
                        //Сессия (квитанция, ticket) представляет собой ресурс-контекст, относительно которого выполняются операции зашифрования и расшифрования. Для работы с квитанцией используется 128-битное значение вида xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, где x-цифра(буква) шестнадцатиричной системы исчисления.
                        this.createTicket();
                    }.bind(that));
                })
                .catch(s => {
                    alert('Ошибка загрузки скриптов')
                });
        },
        endLoad: function () {
            debugger
        },
        containerInfo: null,
        verifier: function () {
            //Получение данных о ключевом контейнере
            let that = this;            
            $('#textData_ResultCertificate')[0].value = null;
            let containerPassword = document.getElementById('containerPassword').value
            $.ajax({
                url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/keyStore/verifier`,
                type: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({keyStorePassword : containerPassword}),
                cache: false
            }).done(function (jsonResponse, textStatus, xhr) {
                that.json_beautify(JSON.stringify(jsonResponse));
                containerInfo = jsonResponse;
                that.containerInfo = containerInfo;
                console.log(jsonResponse);
                //Получение данных сертификата
                that.getSertificate();
            }).fail(function (xhr) {
                try {
                    that.json_beautify(xhr.responseText);
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = jsonResponse.message;
                    console.log(message);
                    failureCause = jsonResponse.failureCause;
                    console.log(jsonResponse);
                } catch (e) {
                    message = (xhr.responseText == undefined) ? "Ошибка при проверке ключевого контейнера." : xhr.responseText;
                    console.log(message);
                }
            })

        },


        localStorageObj: '',
        init: function () {
            
        },
        keyStore: null,
        afterViewInit: function () {
            this.scriptInstaller();

            let that = this;

            let formElem = document.getElementById('formElem')
            formElem.onsubmit = async (e) => {
                e.preventDefault();

               let keyContainerUpload = document.getElementById('keyContainerUpload')
               let rawData = keyContainerUpload.files[0]
               that.keyStore = rawData;
               that.ticketOption();
               //kolya - буду отправлять при отправки файла

                $.ajax({
                    url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/keyStore`,
                    type: "PUT",
                    contentType: "application/octet-stream",
                    processData: false,
                    data: rawData
                }).done(function (jsonResponse, textStatus, xhr) {
                    message = jsonResponse.message;
                    console.log(message);
                    that.messageContainerUpload = message;
                    //Получение данных о ключевом контейнере
                    that.verifier();
                }).fail(function (xhr) {
                    try {
                        var jsonResponse = JSON.parse(xhr.responseText);
                        message = jsonResponse.message;
                        failureCause = jsonResponse.failureCause;
                        that.messageContainerUpload = message;
                        console.log(message);
                    } catch (e) {
                        message = (xhr.responseText == undefined) ? "Ошибка при загрузке данных ключевого контейнера." : xhr.responseText;
                        that.messageContainerUpload = message;
                        console.log(message);
                    }
                })

              };


            document.getElementById('createEP_File').addEventListener('click', function(event) {
                //Создание ЭП - FILE
                this.createEP_File()
            }.bind(this));

            document.getElementById('previewStatusEP_File').addEventListener('click', function(event) {
                //Получение результата создания ЭП
                this.previewStatusEP_File()
            }.bind(this));

            document.getElementById('previewEP_File').addEventListener('click', function(event) {
                //Получение подписанных данных
                this.previewEP_File()
            }.bind(this));

            document.getElementById('previewEP_FileBase64').addEventListener('click', function(event) {
                //Получение подписанных данных Base64
                this.previewEP_FileBase64()
            }.bind(this));

            document.getElementById('createEP_Text').addEventListener('click', function(event) {
                //Получение подписанных данных TEXT
                // this.createEP_Text()
                this.createSessionMain_createEP_Text();
            }.bind(this));

            document.getElementById('convertTextBase64').addEventListener('click', function(event) {
                this.convertTextBase64()
            }.bind(this));


            document.getElementById('generateHash').addEventListener('click', function(event) {
                this.generateHash()
            }.bind(this));


            document.getElementById('verifEP_Text').addEventListener('click', function(event) {
                //Верификация текста
                // this.verifEP_Text();
                this.createSessionMain_verifEP_Text();
            }.bind(this));


            let formElem_CreateEP = document.getElementById('formElem_CreateEP')
            formElem_CreateEP.onsubmit = async (e) => {
                e.preventDefault();
            
                debugger
               let keyContainerUpload = document.getElementById('keyContainerUpload_CreateEP')
               let rawData = keyContainerUpload.files[0]

               this.onChange(rawData);


                $.ajax({
                    url: `https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/${that.ticket_uuid}/data`,
                    type: "POST",
                    contentType: "application/octet-stream",
                    processData: false,
                    data: rawData
                }).done(function (jsonResponse, textStatus, xhr) {
                    debugger
                    message = jsonResponse.message;
                }).fail(function (xhr) {
                    try {
                        debugger
                        var jsonResponse = JSON.parse(xhr.responseText);
                        message = jsonResponse.message;
                        failureCause = jsonResponse.failureCause;
                    } catch (e) {
                        debugger
                        message = (xhr.responseText == undefined) ? "Ошибка при загрузке данных сессии." : xhr.responseText;
                    }
                })

              };


            document.getElementById('getStatus').addEventListener('click', function(event) {
                this.getStatus()
            }.bind(this));

            document.getElementById('getDSData').addEventListener('click', function(event) {
                this.getDSData()
            }.bind(this));

            document.getElementById('getBlobData').addEventListener('click', function(event) {
                this.getBlobData()
            }.bind(this));



        },
        

        destroy: function () {
            this.subs.forEach(sub => sub.unsubscribe())
        },
        onChange: function (file) {
            debugger
            this.state.file = file;
            this.state.fileName = file.name;

            this.createSession();
        },
        state: {
            file: null,
            uuid: null,
            baseUrl: "https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/ticket/",
            fileName: null,
            blobData: null
        },
      
        createSession: function (){
            return fetch(this.state.baseUrl, {
                method: 'POST',
                dataType: "json"
              },).then(response => {
              if (response.ok) {
                  debugger
                response.json().then(json => {
                    debugger
                  this.state.uuid = json.ticketUuid;

                  console.log(json.message);
                  this.sendData();
                });
              }
            });
        },
        sendData: function (){
            var url, dsData;
            url = this.state.baseUrl + this.state.uuid + "/data"
        
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.setRequestHeader("Content-type", "application/octet-stream");
            xhr.onload = function() {
                debugger
              console.log(xhr);
                if (xhr.status === 200) {
                    debugger
                  dsData = xhr.response;
                  console.log(dsData);
                }
            };
            xhr.send(this.state.file);
            this.setMetaData();
        },
        setMetaData: function (){
            var url;
        
            url = this.state.baseUrl + this.state.uuid + "/metadata"
              return fetch(url, {
                method: 'put',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({metaData: this.state.fileName})
              }).then((response) => {
                debugger
                response.json().then((response) => {
                    debugger
                  console.log(response);
                  this.sendSessionData();
                });
            });
        },
        sendSessionData: function (){
            debugger
            var selectedOptions, url;
              selectedOptions = {
                "signatureTsVerifyOption": "IGNORE",
                 "embedSignatureTs": "true",
                 "embedCertificateType": "signerAndCaCert",
                 "signatureType": "DETACHED",
                 "dataTsVerifyOption": "IGNORE",
                 "embedDataTs": "true",
                 "dataToSignQualifier": "ALREADY_SIGNED",
                 "duplicateSign": "false"
            }

            url = this.state.baseUrl + this.state.uuid + "/option";
            return fetch(url, {
              method: 'PUT',
              dataType: "json",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(selectedOptions)
            }).then((response) => {
                debugger
              response.json().then((response) => {
                debugger
                console.log(response);
                this.createDS();
              });
          });
        },
        createDS: function (){
            var url;
            url = this.state.baseUrl + this.state.uuid + "/ds/creator"
        
            return fetch(url, {
              method: 'POST',
              dataType: "json",
              headers: {
                  'Content-Type': "text/plain"
              }
            }).then((response) => {
                debugger
              response.json().then((response) => {
                debugger
                console.log(response);
                // this.getDSData();
              });
            });
        },        
        getDSData: function (){
            debugger
            var url, message, deleteSession, setBlobData, localThis;
        
            url = this.state.baseUrl + this.state.uuid;
            localThis = this;
        
            deleteSession = function() {
                    return fetch(url, {
                    method: "DELETE",
                    dataType: "json",
                    cache: "no-cache",
                    }).then((response) => {
                        debugger
                    response.json().then((response) => {
                        debugger
                        console.log(response);
                    });
                });
            }

            setBlobData = function(data) {
                // return this.setState({blobData:data});
                // localThis.setState({blobData:data});
                debugger
                localThis.state.blobData = data;     
                debugger     
            }
          
              var xhr = new XMLHttpRequest();
              var requestUrl = url  + "/ds/data";
              xhr.open("GET", requestUrl);
              xhr.responseType = "blob";
              xhr.onload = function() {
                  debugger
                if (xhr.status === 200) {
                    var dsData = xhr.response;
                    message = "Данные ЭЦП успешно получены.";
                    console.log(message);
                    console.log(dsData);
                    deleteSession();
                    setBlobData(dsData);
                } else {
                    var reader = new FileReader();
                    reader.onload = function() {
                        var response = reader.result;
                        console.log(response);
                        try {
                            var jsonResponse = JSON.parse(xhr.responseText);
                            message = jsonResponse.message;
                        } catch (e) {
                            message = (xhr.responseText === undefined) ? "Ошибка при получении данных ЭЦП." : xhr.responseText;
                        }
                    }
                    reader.readAsText(xhr.response);
                }
              };
              xhr.send();
        },
        getStatus() {
            return fetch("https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/status", {
              method: 'GET'
              }).then((response) => {
              
              response.json().then((response) => {
                console.log(response);
              });
            });
          },        
        getFeatures() {
            return fetch("https://ccs-dev-api.cipher.kiev.ua/ccs/api/v1/features", {
              method: 'GET'
              }).then((response) => {
              
              response.json().then((response) => {
                console.log(response);
              });
            });
        },        
        getBlobData() {
            var saveBlob = (function () {
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                return function (blob, fileName) {
                    var url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = fileName;
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
            }());
        
            saveBlob(this.state.blobData, this.state.fileName + ".p7s");
        }
          


    };
}());