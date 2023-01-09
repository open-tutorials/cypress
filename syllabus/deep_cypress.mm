flowchart TB
deep_cypress(<span style='font-size:25px'>Cypress внутри</span>)

deep_cypress --> g_cypress_json

subgraph g_cypress_json [" "]
    direction LR
    cypress_json(cypress.json)
    cypress_json --> default_command_timeout(defaultCommandTimeout)
    cypress_json --> chrome_web_security(chromeWebSecurity)
end

deep_cypress --> jquery(jQuery)

deep_cypress --> cypress(Cypress)
cypress --> g_cypress1
cypress --> g_cypress2

subgraph g_cypress1 [" "]
    direction LR
    its
    viewport
    writeFile
    readFile
    within
    each
    eq
    shadow
    window
    screenshot
    intercept
end

subgraph g_cypress2 [" "]
    direction LR
    invoke --> remove_attr(removeAttr)
    invoke --> on
    invoke --> off
    invoke --> css
    invoke --> html

    should --> have_been_called(have.been.called)
    should --> not_be_empty(not.be.empty)
    should --> have_css(have.css)

    stub --> callsFake

    trigger --> mousedown
    trigger --> mousedup
    trigger --> mousemove

    location --> pathname
    location --> search
    location --> hash
end

style deep_cypress stroke:#333,stroke-width:4px
click deep_cypress "/deep_cypress" _blank
