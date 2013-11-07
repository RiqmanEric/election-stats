package election.stats;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Discussion {
	int id;
	String content;
	String name;
	
	public Discussion(int id, String content, String name) {
		super();
		this.id = id;
		this.content = content;
		this.name = name;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
}
