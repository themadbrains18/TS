

interface Template {
    id: string;
    slug: string;
}

async function TemplateFetcher(slug: string): Promise<string | null> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/all-templates`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch templates");
        }

        const data = await response.json();
        const templates: Template[] = data?.results?.templates || [];
        const matchingTemplate = templates.find((template) => template.slug === slug);

        if (!matchingTemplate) {
            throw new Error("No template found with the provided slug");
        }

        return matchingTemplate.id;
    } catch (err) {
        console.error("Error fetching template ID:", err);
        return null;
    }
}

export default TemplateFetcher;